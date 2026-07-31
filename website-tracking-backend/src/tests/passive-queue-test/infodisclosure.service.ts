import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";


const SENSITIVE_PATHS = ['/.env', '/.git/config', '/.git/HEAD', '/config.json', '/wp-config.php.bak'];


@Injectable()
export class InfoDisclosureService {
    async run(url: string) {
        const origin = new URL(url).origin
        const exposed: typeof SENSITIVE_PATHS = []

        for (const path of SENSITIVE_PATHS) {
            const res = await axios.get(`${origin}/${path}`, { timeout: 5000, validateStatus: () => true })
            if (res.status === 200 && res.data) exposed.push(path)
        }

        return {
            status: exposed.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: exposed.length ? Severity.CRITICAL : null,
            data: { exposedPaths: exposed }
        }
    }
}