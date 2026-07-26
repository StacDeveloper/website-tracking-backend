import { BadRequestException, Injectable } from "@nestjs/common";
import { VerificationMethod } from "@prisma/client";
import { randomBytes } from "crypto";
import { PrismaService } from "prisma/prisma.service";
import * as dns from "dns/promises"
import axios from "axios";

@Injectable()
export class VerificationService {
    constructor(private prisma: PrismaService) { }

    async generateVerificationToken(websiteId: string, method: VerificationMethod) {
        const token = await `scantool-verify-${randomBytes(16).toString('hex')}`
        await this.prisma.website.update({
            where: { id: websiteId },
            data: {
                verificationMethod: method, verificationToken: token
            }
        })
        return { token, instruction: this.getInstruction(method, token) }
    }
    async getInstruction(method: VerificationMethod, token: string) {
        switch (method) {
            case VerificationMethod.DNS_TXT:
                return `Add a TXT record : ${token}`
            case VerificationMethod.WELL_KNOWN_FILE:
                return `Create a file at /.well-known/scantool-verify.txt containing: ${token}`
            case VerificationMethod.META_TAG:
                return `Add to <head>: <meta name="scantool-verify" content="${token}" />`
        }
    }

    async verify(websiteId: string) {
        const website = await this.prisma.website.findUnique({ where: { id: websiteId } })
        if (!website) throw new BadRequestException("Website not found");
        if (!website.verificationToken || !website.verificationMethod) throw new BadRequestException("No verification method has been set up yet");

        let verified: boolean = false

        switch (website.verificationMethod) {
            case VerificationMethod.DNS_TXT:
                verified = await this.checkDnsText(website.url, website.verificationToken);
                break;
            case VerificationMethod.META_TAG:
                verified = await this.checkWellKnownFile(website.url, website.verificationToken)
                break;
            case VerificationMethod.WELL_KNOWN_FILE:
                verified = await this.checkMetaTag(website.url, website.verificationToken)
                break;
            default:
                break;
        }

        if (verified) {
            await this.prisma.website.update({
                where: { id: websiteId },
                data: { isVerified: true, verifiedAt: new Date() }
            })
        }
        return { verified }
    }

    private async checkDnsText(url: string, token: string): Promise<boolean> {
        try {
            const domain = new URL(url).hostname
            const records = await dns.resolveTxt(domain)
            return records.some((rerc) => rerc.join('').includes(token))
        } catch (error) {
            return false
        }
    }

    private async checkWellKnownFile(url: string, token: string): Promise<boolean> {
        try {
            const domain = new URL(url).origin
            const res = await axios.get(`${domain}.well-known/scantool-verify.txt`, { timeout: 5000 })
            return typeof res.data === "string" && res.data.includes(token)
        } catch (error) {
            return false
        }
    }

    private async checkMetaTag(url: string, token: string): Promise<boolean> {
        try {
            const res = await axios.get(url, { timeout: 5000 })
            return typeof res.data === "string" && res.data.includes(token)
        } catch (error) {
            return false
        }
    }

}