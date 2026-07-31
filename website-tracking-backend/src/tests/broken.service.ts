import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class BrokenAccessService {
    async run(resourceUrlTemplate?: string) {
        if (!resourceUrlTemplate) {
            return { status: TestStatus.SKIPPED, severity: null, data: { reason: "No resource URL configured" } }
        }

        const idsToTry = ['1', '2', '999', '0']
        const findings: {}[] = []

        for (const id of idsToTry) {
            const testUrl = resourceUrlTemplate.replace("{id}", id)
            const res = await axios.get(testUrl, { timeout: 5000, validateStatus: () => true })
            if (res.status === 200) findings.push({ id, accessible: true })
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.HIGH : null,
            data: { findings }
        }
    }
}