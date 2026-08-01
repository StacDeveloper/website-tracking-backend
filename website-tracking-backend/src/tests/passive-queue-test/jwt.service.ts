import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";
import * as jwt from "jsonwebtoken"

@Injectable()
export class JwtSerice {
    async run(url: string) {
        // try to get a token — assumes a login endpoint or token exposed somewhere;
        // for now, accept a token via response header/cookie/body after a GET (adjust per real flow)
        const res = await axios.get(url, { timeout: 5000, validateStatus: () => true })
        const token = this.extractToken(res)

        if (!token) {
            return { status: TestStatus.SKIPPED, severity: null, data: { reason: "No JWT found to test" } }
        }

        const findings: {}[] = []

        const decoded = jwt.decode(token, { complete: true })
        if (decoded?.header?.alg === "none") {
            findings.push({ issue: "Token uses alg:none — no signature verification" })
        }
        const commonSecrets = ["secret', '123456', 'password', 'changeme', 'jwtsecret"]
        for (const secret of commonSecrets) {
            try {
                jwt.verify(token, secret)
                findings.push({ issue: `Weak secret guessed: "${secret}"` })
                break;
            } catch (error) {

            }
        }
        if (decoded?.payload?.exp) {
            const expireInDays = (decoded.payload.exp * 1000 - Date.now()) / 86400000
            if (expireInDays > 30) {
                findings.push({ issue: `Token expiry too long: ${Math.round(expireInDays)} days` })
            } else {
                findings.push({ issue: 'Token has no expiry (exp) claim' })
            }
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.HIGH : null,
            data: { findings, algorithm: decoded?.header?.alg }
        }

    }
    private async extractToken(res): Promise<string | null> {
        const authHeader = res.headers["authorization"]
        if (authHeader?.startsWith("Bearer ")) return authHeader.split(" ")[1]
        const cookies: string[] = res.headers["set-cookie"] || []
        const jwtCookie = cookies.find((cok) => cok.includes("token=") || cok.includes("jwt="))
        if (jwtCookie) return jwtCookie.split("=")[1].split(";")[0]
        return null
    }
}
// Note on JWT test realism: real sites don't expose tokens on a plain GET /. In practice, the user will need to provide a login endpoint + test credentials (or an existing token) when registering the site for scanning — worth adding a testCredentials field to Website later. For now this works for sites that set the JWT as a cookie/header on any page load.