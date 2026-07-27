import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class SessionCookieService {
    async run(url: string) {
        const res = await axios.get(url, { timeout: 5000, validateStatus: () => true })
        const cookie: string[] = res.headers["set-cookie"] || []
        const issues = cookie.filter((c) => !c.includes("Secure") || !c.includes("HttpOnly") || !c.includes("SameSite")).map((c) => c.split(";")[0])
        return {
            status: issues.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: issues.length ? Severity.MEDIUM : null,
            data: { insureCookies: issues }
        }
    }
}