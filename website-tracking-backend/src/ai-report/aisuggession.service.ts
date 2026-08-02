import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import OpenAi from "openai"
@Injectable()
export class AiSuggestionService {

    private apiKey = process.env.OPENROUTER_API_KEY! as string
    private model = process.env.OPENROUTER_API_MODEL! as string

    private AiModel = new OpenAi({
        apiKey: this.apiKey,
        baseURL: "https://openrouter.ai/api/v1"
    })

    constructor(private prisma: PrismaService) { }

    async generateSuggestion(scanId: string) {
        const scan = await this.prisma.scan.findUnique({
            where: { id: scanId },
            include: { testResults: true }
        })
        if (!scan) return
        const failedResults = await scan.testResults.filter((test) => test.status === "FAILED")
        for (const failed of failedResults) {
            const suggestion = await this.askAi(`A security scan found a "${failed.category}" vulnerability with this evidence: ${JSON.stringify(failed.rawResult)}. In 2-3 sentences, explain the risk in plain language and give a concrete remediation step a developer can implement immediately. No preamble.`)

            await this.prisma.testResult.update({
                where: { id: failed.id },
                data: { aiSuggstion: suggestion }
            })
        }
        const summary = await this.getSummary(failedResults)
        await this.prisma.scan.update({
            where: { id: scanId },
            data: { aiSummary: summary }
        })
    }

    private async getSummary(failedresults: any[]): Promise<string> {
        if (!failedresults.length) return "No vulnerabilities detected across all tests"
        const categories = failedresults.map((result) => result.category).join(', ')
        return this.askAi(`A security scan found failures in these categories: ${categories}. Write a short executive summary (3-4 sentences) prioritizing which issues to fix first and why, for a developer audience. No preamble.`)
    }
    private async askAi(prompt: string): Promise<string> {
        try {
            const res = await this.AiModel.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })

            return res.choices[0]?.message?.content ?? "AI suggestion is not available please try later"
        } catch (error) {
            return "AI suggestion failed please try later"
        }
    }
}