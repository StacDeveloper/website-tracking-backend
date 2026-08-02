import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

const PAYLOADS = [`<script>alert('xss-test')</script>`,
    `"><img src=x onerror=alert('xss-test')>`,
    `'-alert('xss-test')-'`,]

@Injectable()
export class XssService {
    async run(url: string) {
        const paramstoTry = ['q', 'search', 'query', 'name']
        const target = [url, `${url}/rest/products/search`]
        const findings: {}[] = []
        for (const tar of target) {
            for (const param of paramstoTry) {
                for (const payload of PAYLOADS) {
                    const testUrl = `${tar}?${param}=${encodeURIComponent(payload)}`;
                    try {
                        const res = await axios.get(testUrl, { timeout: 5000, validateStatus: () => true });
                        const body = String(res.data);

                        if (body.includes(payload)) {
                            findings.push({ url: testUrl, param, payload, reflected: true });
                        }
                    } catch {
                        // endpoint may not exist — ignore and continue
                    }
                }
            }
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.HIGH : null,
            data: { findings }
        }
    }
}