import { InjectQueue } from "@nestjs/bullmq";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ScanStatus, ScanType } from "@prisma/client";
import { Queue } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { ACTIVE_TEST, PASSIVE_TEST } from "./scan.test-catogory";


@Injectable()
export class ScanService {
    constructor(private prisma: PrismaService,
        @InjectQueue("passive-scan") private passiveQueue: Queue,
        @InjectQueue("active-scan") private activeQueue: Queue,
    ) { }

    async startScan(url: string, userId: string) {

        const website = await this.prisma.website.upsert({
            where: { url_ownerId: { url, ownerId: userId } },
            update: {},
            create: {
                url,
                ownerId: userId,
                isVerified: false
            }
        })

        const scan = await this.prisma.scan.create({
            data: {
                websiteId: website.id,
                scanType: website.isVerified ? ScanType.ACTIVE : ScanType.PASSIVE,
                status: ScanStatus.PENDING
            }
        })

        for (const category of PASSIVE_TEST) {
            await this.passiveQueue.add(
                "run-test-Passive-Queue",
                { scanId: scan.id, website, url: website.url, category },
                { jobId: `${scan.id}-${category}`, attempts: 2 }
            )

        }
        if (website.isVerified) {
            for (const category of ACTIVE_TEST) {
                await this.activeQueue.add(
                    "run-test-Active-Queue",
                    {
                        scanId: scan.id, website, url: website.url, category, config: {
                            loginEndPoint: website.loginEndPoint,
                            registerEndPoint: website.registerEndPoint,
                            uploadEndPoint: website.uploadEndPoint,
                            sampleResourceUrl: website.sampleResourceUrl,
                            massAssignEndPoint: website.massAssignEndpoint
                        }
                    },
                    { jobId: `${scan.id}-${category}`, attempts: 1 },
                )
            }
        }

        await this.prisma.scan.update({
            where: { id: scan.id },
            data: { status: ScanStatus.RUNNING, startedAt: new Date() }
        })
        return {
            scan,
            skippedActiveTest: !website.isVerified,
            message: !website.isVerified ? "Website not verified — only passive tests will run. Verify ownership to unlock full scan." : "Full scan started."
        }

    }
    async getScanStatus(scanId: string, userId: string) {
        const status = await this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true, website: true }
        })
        if (!status) throw new NotFoundException("Scan not found")
        if (status.website.ownerId !== userId) throw new ForbiddenException("You dont have access to this scan")
        return status
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

}

