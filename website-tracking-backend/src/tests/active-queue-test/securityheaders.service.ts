import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

const REQUIRED_HEADERS = ['content-security-policy',
    'strict-transport-security',
    'x-frame-options',
    'x-content-type-options',
    'referrer-policy',]

@Injectable()
export class SecurityHeadersService {
    async run(url: string) {
        const res = await axios.get(url, { timeout: 5000, validateStatus: () => true })
        const headers = res.headers
        const missing = REQUIRED_HEADERS.filter((header) => !headers[header])
        return {
            status: missing.length === 0 ? TestStatus.PASSED : TestStatus.FAILED,
            severity: missing.length > 2 ? Severity.HIGH : missing.length > 0 ? Severity.MEDIUM : null,
            data: { missing, parent: Object.keys(headers) }
        }

    }
}