import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class CorsService {
    async run(url: string) {
        const res = await axios.get(url, {
            headers: { Origin: "https://evil-test-domain.com" },
            timeout: 5000,
            validateStatus: () => true
        })
        const allowedOrigin = res.headers["access-control-allow-origin"]
        const reflectany = allowedOrigin === "*" || allowedOrigin === "https://evil-test-domain.com"
        return {
            status: reflectany ? TestStatus.FAILED : TestStatus.PASSED,
            severity: reflectany ? Severity.HIGH : null,
            data: { allowedOrigin }
        }
    }
}