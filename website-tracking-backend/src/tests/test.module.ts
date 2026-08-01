import { Module } from "@nestjs/common";
import { TlsSslService } from "./passive-queue-test/tls-sls.service";
import { CorsService } from "./passive-queue-test/cors.service";
import { ClickJackingService } from "./passive-queue-test/clickjacking.service";
import { InfoDisclosureService } from "./passive-queue-test/infodisclosure.service";
import { SessionCookieService } from "./passive-queue-test/sessioncookie.service";
import { OpenRedirectService } from "./passive-queue-test/openredirect.service";
import { PathTransversalService } from "./passive-queue-test/pathtransversal.service";
import { SSRFService } from "./passive-queue-test/ssrf.service";
import { CsrfService } from "./passive-queue-test/csrf.service";
import { JwtSerice } from "./passive-queue-test/jwt.service";
import { DependancyCVEService } from "./passive-queue-test/dependancecve.service";
import { SecurityHeadersService } from './passive-queue-test/securityheaders.service';


import { SqlInjectionService } from "./active-queue-test/sqlinjection.service";
import { XssService } from "./active-queue-test/xss.service";
import { RateLimitService } from "./active-queue-test/ratelimit.service";
import { BotService } from "./active-queue-test/bot.service";
import { FakeUserService } from "./active-queue-test/fakeuser.service";
import { FileUploadService } from "./active-queue-test/fileupload.service";
import { CommandInjectionService } from "./active-queue-test/commandinjection.service";
import { BrokenAccessService } from "./active-queue-test/broken.service";
import { ApiMassManagementService } from "./active-queue-test/apimanagement.service";

const ALL_TEST_SERVICES = [
    SecurityHeadersService, TlsSslService, CorsService, ClickJackingService,
    InfoDisclosureService, SessionCookieService, OpenRedirectService,
    PathTransversalService, SSRFService, CsrfService, JwtSerice, DependancyCVEService,
    SqlInjectionService, XssService, RateLimitService, BotService, FakeUserService,
    FileUploadService, CommandInjectionService, BrokenAccessService,
    ApiMassManagementService
]

@Module({
    providers: ALL_TEST_SERVICES,
    exports: ALL_TEST_SERVICES
})
export class TestModule { }