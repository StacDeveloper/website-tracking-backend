import { Processor, WorkerHost } from "@nestjs/bullmq";
import { TestCategory, TestStatus } from "@prisma/client";
import { Job } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { SqlInjectionService } from '../tests/active-queue-test/sqlinjection.service';
import { XssService } from '../tests/active-queue-test/xss.service';
import { RateLimitService } from '../tests/active-queue-test/ratelimit.service';
import { BotService } from '../tests/active-queue-test/bot.service';
import { FakeUserService } from '../tests/active-queue-test/fakeuser.service';
import { FileUploadService } from '../tests/active-queue-test/fileupload.service';
import { CommandInjectionService } from "../tests/active-queue-test/commandinjection.service";
import { BrokenAccessService } from "../tests/active-queue-test/broken.service";
import { ApiMassManagementService } from "../tests/active-queue-test/apimanagement.service";
import { pubsub } from "./pubsub.provider";
import { AiSuggestionService } from "../ai-report/aisuggession.service";

@Processor("active-scan", { concurrency: 2 })
export class ActiveScanProcessor extends WorkerHost {
    constructor(
        private prisma: PrismaService,
        private sqlInjection: SqlInjectionService,
        private xss: XssService,
        private rateLimit: RateLimitService,
        private bot: BotService,
        private fakeUser: FakeUserService,
        private fileUpload: FileUploadService,
        private cmdInjectionXxe: CommandInjectionService,
        private brokenAccessControl: BrokenAccessService,
        private apiMassAssignMent: ApiMassManagementService,
        private aiSuggestion: AiSuggestionService
    ) { super() }

    async process(job: Job) {
        const { scanId, url, category, config } = job.data

        try {
            const result = await this.runTest(category, url, config)
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: result!.status,
                    severity: result!.severity,
                    rawResult: result!.data,
                    aiSuggstion: ""
                }
            })
        } catch (error: any) {
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: TestStatus.ERROR,
                    rawResult: { error: error.message },
                    aiSuggstion: ""
                }
            })
        }
        const updatedScan = await this.checkScanCompletion(scanId)
        if (updatedScan?.status === "COMPLETED") {
            await this.aiSuggestion.generateSuggestion(scanId)
        }
        await pubsub.publish("scanUpdated", { scanUpdated: updatedScan })
    }

    private async runTest(category: TestCategory, url: string, config: any) {
        switch (category) {
            case TestCategory.SQL_INJECTION:
                return this.sqlInjection.run(url, config?.loginEndPoint)
            case TestCategory.XSS:
                return this.xss.run(url)
            case TestCategory.BOT:
                return this.bot.run(url)
            case TestCategory.FAKE_USER:
                return this.fakeUser.run(url, config?.registerEndPoint)
            case TestCategory.FILE_UPLOAD:
                return this.fileUpload.run(config?.uploadEndPoint)
            case TestCategory.BROKEN_ACCESS_CONTROL:
                return this.brokenAccessControl.run(config?.sampleResourceUrl)
            case TestCategory.COMMAND_INJECTION_XXE:
                return this.cmdInjectionXxe.run(url)
            case TestCategory.API_MASS_ASSIGNMENT:
                return this.apiMassAssignMent.run(url)
            case TestCategory.RATE_LIMIT:
                return this.rateLimit.run(url)
        }
    }
    private async checkScanCompletion(scanId: string) {
        const scan = await this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true },
        });
        if (!scan) return null;

        const expectedCount = scan.scanType === 'ACTIVE' ? 21 : 12;
        if (scan.testResults.length >= expectedCount && scan.status !== 'COMPLETED') {
            return this.prisma.scan.update({
                where: { id: scanId },
                data: { status: 'COMPLETED', completedAt: new Date() },
                include: { testResults: true },
            });
        }
        return scan;

    }
}
