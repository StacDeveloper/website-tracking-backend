import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class FakeUserService {
    async run(url: string, registerendpoint?: string) {
        if (!registerendpoint) {
            return { status: TestStatus.FAILED, severity: null, data: { reason: "No registration endpoint configured" } }
        }
        const attempts = Array.from({ length: 3 }, (data, index) => ({
            email: `scantool-test-${Date.now()}-${index}@example.com`,
            password: "TestPassword123!"
        }))
        const results: number[] = []
        for (const atem of attempts) {
            const res = await axios.post(registerendpoint, attempts, { timeout: 5000, validateStatus: () => true })
            results.push(res.status)
        }
        const allSucceeded = results.every((res) => res >= 200 && res < 300)
        return {
            status: allSucceeded ? TestStatus.FAILED : TestStatus.PASSED,
            severity: allSucceeded ? Severity.MEDIUM : null,
            data: { message: "No CAPTCHA/email-verification/throttle detected on signup" }

        }
    }
}