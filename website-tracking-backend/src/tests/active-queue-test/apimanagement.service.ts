import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class ApiMassManagementService {
    async run(endpoint?: string) {
        if (!endpoint) {
            return { status: TestStatus.SKIPPED, severity: null, data: { reason: "No endpoint configured" } }
        }

        const payload = { name: "scantool-test", isAdmin: true, role: "admin", verified: true }
        const res = await axios.post(endpoint, payload, { timeout: 5000, validateStatus: () => true })
        const body = JSON.stringify(res.data).toLowerCase()

        const accepted = res.status >= 200 && res.status < 300 && (body.includes('"isadmin":true')) || body.includes('"role":"admin"')
        return {
            status: accepted ? TestStatus.FAILED : TestStatus.PASSED,
            severity: accepted ? Severity.CRITICAL : null,
            data: { accepted, responseSnippet: body.slice(0, 200) }
        }
    }
}