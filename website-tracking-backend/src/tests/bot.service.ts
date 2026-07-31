import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class BotService {
    async run(url: string) {
        const results: number[] = []
        for (let i = 0; i < 5; i++) {
            const res = await axios.get(url, {
                timeout: 5000,
                validateStatus: () => true,
                headers: { "User-Agent": "curl/7.68.0" }
            })
            results.push(res.status)
        }
        const blocked = results.some((res) => res === 403 || res === 429)
        return {
            status:blocked ? TestStatus.PASSED : TestStatus.FAILED,
            severity: blocked ? null : Severity.MEDIUM,
            data:{statusCodes: results, blocked}
        }
    }
}