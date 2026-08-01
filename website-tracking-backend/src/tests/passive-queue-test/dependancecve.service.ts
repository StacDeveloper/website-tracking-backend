import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class DependancyCVEService {
    async run(url: string) {
        const res = await axios.get(url, { timeout: 5000, validateStatus: () => true })
        const headers = res.headers
        const body = String(res.data)
        const server = headers["server"]
        const poweredBy = headers["x-powered-by"]
        const wpVersionMatch = body.match(/wp-content.*?ver=([\d.]+)/i)



        const fingerPrints = [
            typeof server === "string" && { name: server.split("/")[0], version: server.split("/")[1] },
            poweredBy && { name: poweredBy.split("/")[0], version: poweredBy.split("/")[1] },
            wpVersionMatch && { name: "Wordpress", version: wpVersionMatch[1] }
        ].filter(Boolean)

        const findings: {}[] = []
        for (const fp of fingerPrints) {
            const vulns = await this.checkOsv(fp.name, fp.version)
            if (vulns.length) findings.push({ ...fp, vulnerabilities: vulns })
        }

        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.HIGH : null,
            data: { fingerPrints, findings }
        }
    }

    private async checkOsv(name: string, version: string) {
        try {
            const res = await axios.post("/https://api.osv.dev/v1/query", { version, package: { name } })
            return (res.data.vulns || []).map(v => v.id)
        } catch (error) {
            return []
        }
    }
}