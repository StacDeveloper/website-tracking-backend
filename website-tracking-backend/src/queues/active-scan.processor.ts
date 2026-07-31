import { Processor, WorkerHost } from "@nestjs/bullmq";
import { TestCategory, TestStatus } from "@prisma/client";
import { Job } from "bullmq";
import { PrismaService } from "prisma/prisma.service";
import { ApiMassManagementService } from "src/tests/active-queue-test/apimanagement.service";
import { BotService } from "src/tests/active-queue-test/bot.service";
import { BrokenAccessService } from "src/tests/active-queue-test/broken.service";
import { CommandInjectionService } from "src/tests/active-queue-test/commandinjection.service";
import { FakeUserService } from "src/tests/active-queue-test/fakeuser.service";
import { FileUploadService } from "src/tests/active-queue-test/fileupload.service";
import { RateLimitService } from "src/tests/active-queue-test/ratelimit.service";
import { XssService } from "src/tests/active-queue-test/xss.service";
import { SqlInjectionService } from "src/tests/passive-queue-test/sqlinjection.service";

@Processor("active-test", { concurrency: 2 })
export class ActiveClassProcessor extends WorkerHost {
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
        private apiMassAssignMent: ApiMassManagementService
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
                    rawResult: result!.data
                }
            })
        } catch (error: any) {
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: TestStatus.ERROR,
                    rawResult: { error: error.message }
                }
            })
        }
    }

    private async runTest(category: TestCategory, url: string, config) {
        switch (category) {
            case TestCategory.SQL_INJECTION:
                return this.sqlInjection.run(url)
            case TestCategory.XSS:
                return this.xss.run(url)
            case TestCategory.BOT:
                return this.bot.run(url)
            case TestCategory.FAKE_USER:
                return this.fakeUser.run(url, config?.registerEndPoint)
            case TestCategory.FILE_UPLOAD:
                return this.fileUpload.run(url)
            case TestCategory.BROKEN_ACCESS_CONTROL:
                return this.brokenAccessControl.run(url)
            case TestCategory.COMMAND_INJECTION_XXE:
                return this.cmdInjectionXxe.run(url)
            case TestCategory.API_MASS_ASSIGNMENT:
                return this.apiMassAssignMent.run(url)
            case TestCategory.RATE_LIMIT:
                return this.rateLimit.run(url)
        }
    }

}