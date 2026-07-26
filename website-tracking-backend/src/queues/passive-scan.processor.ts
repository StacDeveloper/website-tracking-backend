import { Processor, WorkerHost } from "@nestjs/bullmq";
import { TestCategory, TestStatus } from "@prisma/client";
import { Job } from "bullmq";
import { PrismaService } from "prisma/prisma.service";
import { TryCatch } from "src/lib/trycatch";

@Processor("passive-scan")
export class PassiveProcessor extends WorkerHost {
    constructor(private prisma: PrismaService, private securityHeaders: SecurityHeadersService, private tlsSSl: TlsSslService) { super() }

    async process(job: Job) {
        const { scanId, url, category } = job.data
        try {
            const result = await this.runTest(category, url)
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: result.status,
                    severity: result.severity,
                    rawResult: result.data
                }
            })
        } catch (err: any) {
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: TestStatus.ERROR,
                    rawResult: { error: err.message }
                }
            })
        }
        await this.checkScanCompletion(scanId)
    }

    private async runTest(category: TestCategory, url: string) {
        switch (category) {
            case TestCategory.SECURITY_HEADERS:
                return this.securityHeaders.run(url)
            case TestCategory.TLS_SSL:
                return this.tlsSSl.run(url)
            default:
                return { status: TestStatus.SKIPPED, severity: null, data: {} }
        }
    }
    private async checkScanCompletion(scanId: string) {
        const scan = await this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true }
        })
    }
}