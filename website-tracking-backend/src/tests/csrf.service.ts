import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class CsrfService {
    async run(url: string) {
        const res = await axios.get(url, { timeout: 5000, validateStatus: () => true })
        const body = String(res.data).toLowerCase()
        const hasCSRFtoken = body.includes("csrf") || body.includes("_token")

        return {
            status: hasCSRFtoken ? TestStatus.PASSED : TestStatus.FAILED,
            severity: hasCSRFtoken ? null : Severity.MEDIUM,
            data: { csrftokenFound: hasCSRFtoken }
        }
    }
}