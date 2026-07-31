import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

const PAYLOADS = [`<script>alert('xss-test')</script>`,
    `"><img src=x onerror=alert('xss-test')>`,
    `'-alert('xss-test')-'`,]

@Injectable()
export class XssService {
    async run(url: string) {
        const findings: {}[] = []
        for (const payload of PAYLOADS) {
            const testurl = `${url}?q=${encodeURIComponent(payload)}`
            const res = await axios.get(testurl, { timeout: 5000, validateStatus: () => true })
            const body = String(res.data)

            if (body.includes(payload)) {
                findings.push({ payload, reflected: true })
            }
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.HIGH : null,
            data: { findings }
        }
    }
}