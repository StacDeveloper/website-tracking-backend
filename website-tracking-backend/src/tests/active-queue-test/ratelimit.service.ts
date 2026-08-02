import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

@Injectable()
export class RateLimitService {
    async run(url: string) {
        const REQUEST_COUNT = 30;
        const request = Array.from({ length: REQUEST_COUNT }, () =>
            axios.get(url, { timeout: 5000, validateStatus: () => true })
        )
        const responses: any = await Promise.allSettled(request)
        const statuses = responses.map((res) => res.status === "fulfilled" ? res.value.status : 0)
        const got429 = statuses.some((status) => status === 429)
        const allSucceeded = statuses.every((status) => status >= 200 && status < 400)
        return {
            status: got429 ? TestStatus.PASSED : TestStatus.FAILED,
            severity: got429 ? null : Severity.HIGH,
            data: {
                totalRequest: REQUEST_COUNT,
                got429,
                allSucceeded,
                statusCodes: statuses
            }
        }
    }
}
// Note on JWT test realism: real sites don't expose tokens on a plain GET /. In practice, the user will need to provide a login endpoint + test credentials (or an existing token) when registering the site for scanning — worth adding a testCredentials field to Website later. For now this works for sites that set the JWT as a cookie/header on any page load.

