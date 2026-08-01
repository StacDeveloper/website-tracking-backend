import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import * as tls from "tls"

interface ScanResult {
    status: TestStatus,
    severity: Severity | null,
    data: any
}

@Injectable()
export class TlsSslService {
    async run(url: string) {
        const host = new URL(url).hostname
        return new Promise<ScanResult>((resolve) => {
            const socket = tls.connect({ host, port: 443, servername: host, timeout: 5000 }, () => {
                const cert = socket.getPeerCertificate()
                const protocoal = socket.getProtocol()
                const expired = new Date(cert.valid_to) < new Date();
                const weakProtocoal = ["TLSv1", "TLSv1.1"].includes(protocoal || "")

                socket.end()
                resolve({
                    status: expired || weakProtocoal ? TestStatus.FAILED : TestStatus.PASSED,
                    severity: expired ? Severity.CRITICAL : weakProtocoal ? Severity.HIGH : null,
                    data: { protocoal, validTo: cert.valid_to, expired, weakProtocoal }
                })
            })
            socket.on("error", () => {
                resolve({ status: TestStatus.ERROR, severity: null, data: { error: "TLS connection failed" } })
            })
        })
    }
}