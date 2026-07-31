import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class OpenRedirectService {
    async run(url: string) {
        const testUrl = `${url}/redirect=https://evil-test-domain.com`
        const res = await axios.get(testUrl, { timeout: 5000, validateStatus: () => true, maxRedirects: 0 })
        const location = res.headers["location"]
        const vulnerable = location?.includes("evil-test-domain.com")

        return {
            status: vulnerable ? TestStatus.FAILED : TestStatus.PASSED,
            severity: vulnerable ? Severity.MEDIUM : null,
            data: { location: location || null }
        }
    }
}