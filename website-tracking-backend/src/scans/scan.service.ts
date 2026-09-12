import { InjectQueue } from "@nestjs/bullmq";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ScanStatus, ScanType, TestCategory } from "@prisma/client";
import { Queue } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { ACTIVE_TEST, PASSIVE_TEST } from "./scan.test-catogory";
import { WebsiteConfigInput } from "./scan.graphql";

const BLOCKED_PATTERNS = [/\.gov$/i,
    /\.gov\.\w+$/i,
    /\.mil$/i,
    /bank/i,]

function checkUrl(url: string): boolean {
    try {
        const hostname = new URL(url).hostname
        return BLOCKED_PATTERNS.some((pat) => pat.test(hostname))
    } catch (error) {
        return true
    }
}

@Injectable()
export class ScanService {
    constructor(private prisma: PrismaService,
        @InjectQueue("passive-scan") private passiveQueue: Queue,
        @InjectQueue("active-scan") private activeQueue: Queue,
    ) { }

    async startScan(url: string, userId: string, categories: TestCategory[], config?: WebsiteConfigInput) {
        if (checkUrl(url)) {
            throw new BadRequestException("This domain cannot be scanned. Government, military, and financial institution websites are not permitted targets for this tool.")
        }
        const website = await this.prisma.website.upsert({
            where: { url_ownerId: { url, ownerId: userId } },
            update: { ...config },
            create: {
                url,
                ownerId: userId,
                isVerified: false,
                ...config
            }
        })

        const uniqueCategory = [...new Set(categories)]
        const requestedPassive = uniqueCategory.filter((cat) => PASSIVE_TEST.includes(cat))
        const requestedActive = uniqueCategory.filter((cat) => ACTIVE_TEST.includes(cat))

        const willRunActive = website.isVerified ? requestedActive : []
        const skippedActiveTest = website.isVerified ? [] : requestedActive

        const totalExpected = requestedPassive.length + willRunActive.length




        const scan = await this.prisma.scan.create({
            data: {
                websiteId: website.id,
                scanType: website.isVerified ? ScanType.ACTIVE : ScanType.PASSIVE,
                status: ScanStatus.PENDING,
                expectedCount: totalExpected
            }
        })

        for (const category of requestedPassive) {
            await this.passiveQueue.add(
                "run-test-Passive-Queue",
                { scanId: scan.id, website, url: website.url, category },
                { jobId: `${scan.id}-${category}`, attempts: 2 }
            )
        }
        for (const category of willRunActive) {
            await this.activeQueue.add(
                "run-test-Active-Queue",
                {
                    scanId: scan.id, url: website.url, category,
                    config: {
                        loginEndPoint: website.loginEndPoint,
                        registerEndPoint: website.registerEndPoint,
                        uploadEndPoint: website.uploadEndPoint,
                        sampleResourceUrl: website.sampleResourceUrl,
                        massAssignEndPoint: website.massAssignEndPoint
                    }
                },
                { jobId: `${scan.id}-${category}`, attempts: 1 }
            )
        }

        await this.prisma.scan.update({
            where: { id: scan.id },
            data: { status: ScanStatus.RUNNING, startedAt: new Date() }
        })
        return {
            scan,
            skippedActiveTest: skippedActiveTest.length > 0,
            skippedActiveCategory: skippedActiveTest,
            message: skippedActiveTest.length > 0 ? `Website not verified — ${skippedActiveTest.length} active test(s) skipped. Verify ownership to unlock them.` : "Scan started with selected tests"
        }

    }
    async getScanStatus(scanId: string, userId: string) {
        const status = await this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true, website: true }
        })
        if (!status) throw new NotFoundException("Scan not found")
        if (status.website.ownerId !== userId) throw new ForbiddenException("You dont have access to this scan")
        return {
            ...status,
            testResultsCount: status.testResults.length,
            passedCount: status.testResults.filter((test) => test.status === "PASSED").length,
            issuesFound: status.testResults.filter((test) => test.status === "FAILED").length
        }
    }



    async getMyTests(userId: string) {
        const tests = await this.prisma.scan.findMany({
            where: { website: { ownerId: userId } },
            include: { testResults: true, website: true },
            orderBy: { createdAt: "desc" }
        })
        if (!tests || tests.length === 0) {
            return { success: false, message: !tests ? "Tests not found would you like to create your 1st web test" : "No test has been made for user" }
        }
        return tests
    }
    async getHistoryofUser(userId: string) {
        const scan = await this.prisma.scan.findMany({
            where: { website: { ownerId: userId } },
            include: { website: true, testResults: true },
            orderBy: { createdAt: "desc" }
        })
        return scan.map((s) => ({
            ...s,
            testResultsCount: s.testResults.length,
            passedCount: s.testResults.filter((test) => test.status === "PASSED").length,
            issueCount: s.testResults.filter((test) => test.status === "FAILED").length
        }))
    }

    async saveWebsiteOfUser(websiteId: string, userId: string) {
        if (!websiteId) {
            throw new NotFoundException("Website Id not provided")
        }
        const website = await this.prisma.website.findUnique({ where: { id: websiteId } })
        if (!website || website.ownerId !== userId) {
            throw new ForbiddenException("This is not your website")
        }
        const updated = await this.prisma.website.update({
            where: { id: websiteId },
            data: { isSaved: !website.isSaved }
        })
        return updated.isSaved
    }

    async getSavedWebsiteOfUser(userId: string) {
        const websites = await this.prisma.website.findMany({
            where: { ownerId: userId, isSaved: true },
            include: {
                scans: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                    include: { testResults: true }
                }
            }
        })
        return websites.map((web) => {
            const latestScan = web.scans[0]
            const testResults = latestScan?.testResults ?? []
            const passed = testResults.filter((test) => test.status === "PASSED").length
            const score = testResults.length ? Math.round((passed / testResults.length) * 100) : null
            const categories = testResults.map((test) => test.category)
            return {
                id: web.id,
                domain: new URL(web.url).hostname,
                url: web.url,
                lastTested: latestScan?.createdAt ?? null,
                score,
                tests: testResults.length,
                lastCategories: categories ?? []
            }
        })
    }

}

