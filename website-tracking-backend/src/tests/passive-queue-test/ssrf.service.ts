import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

const SSRF_TARGETS = [
    'http://169.254.169.254/latest/meta-data/', // AWS metadata endpoint
    'http://localhost:80',
    'http://127.0.0.1:80',
    'http://[::1]:80',
];

@Injectable()
export class SSRFService {
    async run(url: string) {
        const findings: {}[] = []

        const candidateParams = ['url', 'callback', 'target', 'image', 'fetch', 'redirect'];

        for (const param of candidateParams) {
            for (const target of SSRF_TARGETS) {
                try {
                    const testUrl = `${url}?${param}=${encodeURIComponent(target)}`;
                    const res = await axios.get(testUrl, { timeout: 5000, validateStatus: () => true })
                    const body = String(res.data).toLowerCase()

                    if (body.includes("ami-id") || body.includes("instance-id")) {
                        findings.push({ param, target, evidence: "AWS metadata exposed" })
                    }
                } catch (error) {

                }
            }
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.CRITICAL : null,
            data: { findings }
        }
    }
}