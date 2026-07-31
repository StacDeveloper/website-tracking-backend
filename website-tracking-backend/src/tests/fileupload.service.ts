import { Injectable } from "@nestjs/common";
import { Severity, TestStatus } from "@prisma/client";
import FormData from "form-data"
import axios from "axios";

@Injectable()
export class FileUploadService {
    async run(uploadEndPoint?: string) {
        if (!uploadEndPoint) {
            return { status: TestStatus.FAILED, severity: null, data: { reason: "No upload endpoint configured" } }
        }

        const findings: {}[] = []
        const content = Buffer.from('<?php echo "scantool-test"; ?>');
        const blob = new Blob([content], {
            type: "application/x-http-php"
        })
        const form = new FormData()
        form.append("file", blob, "test.php")

        const res = await axios.post(uploadEndPoint, form, {
            headers: form.getHeaders(),
            timeout: 5000,
            validateStatus: () => true
        })
        if (res.status >= 200 && res.status < 300) {
            findings.push({ issue: "Server accepted .php file upload without extension filtering" })
        }
        return {
            status: findings.length ? TestStatus.FAILED : TestStatus.PASSED,
            severity: findings.length ? Severity.CRITICAL : null,
            data: { findings }
        }
    }
}