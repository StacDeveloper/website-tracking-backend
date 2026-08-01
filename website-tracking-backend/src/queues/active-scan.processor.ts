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
                    rawResult: result!.data,
                    aiSuggstion:""
                }
            })
        } catch (error: any) {
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: TestStatus.ERROR,
                    rawResult: { error: error.message },
                    aiSuggstion:""
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
