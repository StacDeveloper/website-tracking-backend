import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class ClickJackingService {
    async run(url: string) {
        const res = await axios.get(url, { timeout: 5000, validateStatus: () => true })
        const xfo = res.headers["x-frame-options"]
        const csp = res.headers["content-security-policy"] || ""
        const prot = !!xfo || csp.includes("frame-ancestors")
        return {
            status: prot ? TestStatus.PASSED : TestStatus.FAILED,
            severity: prot ? null : Severity.MEDIUM,
            data: { xFrameOptions: xfo || null, hasFrameAcestors: csp.includes("frame-ancestors") }
        }
    }
}