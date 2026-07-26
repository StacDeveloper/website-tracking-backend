import { InjectQueue } from "@nestjs/bullmq";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ScanStatus, ScanType } from "@prisma/client";
import { Queue } from "bullmq";
import { PrismaService } from "prisma/prisma.service";
import { PASSIVE_TEST } from "./scan.test-catogory";

@Injectable()
export class ScanService {
    constructor(private prisma: PrismaService,
        @InjectQueue("passive-scan") private passiveQueue: Queue,
        @InjectQueue("active-scan") private activeQueue: Queue,
    ) { }

    async startScan(websiteId: string, userId: string) {
        const website = await this.prisma.website.findUnique({
            where: { id: websiteId }
        })
        if (!website) throw new NotFoundException("Website not found");
        if (website.ownerId !== userId) throw new BadRequestException("You are not the owner of this website")
        const scan = await this.prisma.scan.create({
            data: {
                websiteId,
                scanType: website.isVerified ? ScanType.ACTIVE : ScanType.PASSIVE,
                status: ScanStatus.PENDING
            }
        })

        for (const category of PASSIVE_TEST) {
            await this.passiveQueue.add(
                "run-test",
                { scanId: scan.id, websiteId, url: website.url, category },
                { jobId: `${scan.id}-${category}`, attempts: 2 }
            )
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
    async getScanStatus(scanId: string) {
        return this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true }
        })
    }
}

