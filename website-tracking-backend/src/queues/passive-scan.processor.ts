import { Processor, WorkerHost } from "@nestjs/bullmq";
import { TestCategory, TestStatus } from "@prisma/client";
import { Job } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { SecurityHeadersService } from '../tests/passive-queue-test/securityheaders.service';
import { TlsSslService } from '../tests/passive-queue-test/tls-sls.service';
import { CorsService } from '../tests/passive-queue-test/cors.service';
import { ClickJackingService } from '../tests/passive-queue-test/clickjacking.service';
import { InfoDisclosureService } from '../tests/passive-queue-test/infodisclosure.service';
import { SessionCookieService } from '../tests/passive-queue-test/sessioncookie.service';
import { OpenRedirectService } from '../tests/passive-queue-test/openredirect.service';
import { PathTransversalService } from '../tests/passive-queue-test/pathtransversal.service';
import { SSRFService } from '../tests/passive-queue-test/ssrf.service';
import { CsrfService } from '../tests/passive-queue-test/csrf.service';
import { JwtSerice } from '../tests/passive-queue-test/jwt.service';
import { DependancyCVEService } from "../tests/passive-queue-test/dependancecve.service";
import { pubsub } from "./pubsub.provider";
import { AiSuggestionService } from "../ai-report/aisuggession.service";



@Processor("passive-scan", { concurrency: 10 })
export class PassiveScanProcessor extends WorkerHost {
    constructor(
        private prisma: PrismaService,
        private securityHeaders: SecurityHeadersService,
        private tlsSSl: TlsSslService,
        private cors: CorsService,
        private clickJacking: ClickJackingService,
        private infoDisclosure: InfoDisclosureService,
        private sessionCookie: SessionCookieService,
        private openRedirect: OpenRedirectService,
        private pathTransversal: PathTransversalService,
        private ssrf: SSRFService,
        private csrf: CsrfService,
        private jwt: JwtSerice,
        private dependencycve: DependancyCVEService,
        private aiSuggestionService: AiSuggestionService

    ) { super() }

    async process(job: Job) {
        const { scanId, url, category } = job.data
        try {
            const result = await this.runTest(category, url)
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
        } catch (err: any) {
            await this.prisma.testResult.create({
                data: {
                    scanId,
                    category,
                    status: TestStatus.ERROR,
                    rawResult: { error: err.message },
                    aiSuggstion: ""
                }
            })
        }

        const updatedScan = await this.checkScanCompletion(scanId)
        if (updatedScan?.status === "COMPLETED") {
            await this.aiSuggestionService.generateSuggestion(scanId)
        }
        await pubsub.publish("scanUpdated", { scanUpdated: updatedScan })
    }

    private async runTest(category: TestCategory, url: string) {
        switch (category) {
            case TestCategory.SECURITY_HEADERS: return this.securityHeaders.run(url);
            case TestCategory.TLS_SSL: return this.tlsSSl.run(url);
            case TestCategory.CORS: return this.cors.run(url);
            case TestCategory.CLICKJACKING: return this.clickJacking.run(url);
            case TestCategory.INFO_DISCLOSURE: return this.infoDisclosure.run(url);
            case TestCategory.SESSION_COOKIE: return this.sessionCookie.run(url);
            case TestCategory.OPEN_REDIRECT: return this.openRedirect.run(url);
            case TestCategory.PATH_TRAVERSAL: return this.pathTransversal.run(url);
            case TestCategory.SSRF: return this.ssrf.run(url);
            case TestCategory.CSRF: return this.csrf.run(url);
            case TestCategory.JWT: return this.jwt.run(url);
            case TestCategory.DEPENDENCY_CVE: return this.dependencycve.run(url);
            default: return { status: TestStatus.SKIPPED, severity: null, data: { status: null, severity: null, data: null } };
        }
    }
    private async checkScanCompletion(scanId: string) {
        const scan = await this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true }
        })
        if (!scan) return

        const expectedCound = scan.scanType === "ACTIVE" ? 21 : 12
        if (scan.testResults.length >= expectedCound) {
            return await this.prisma.scan.update({
                where: { id: scanId },
                data: { status: "COMPLETED", completedAt: new Date() }
            })
        }
        return scan
    }
}
