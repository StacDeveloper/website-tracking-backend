import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { PassiveScanProcessor } from "./passive-scan.processor";
import { ActiveScanProcessor } from "./active-scan.processor";
import { TestModule } from "../tests/test.module";
import { AiSuggestionModule } from "../ai-report/aisuggestion.module";

@Module({
    imports: [BullModule.registerQueue(
        { name: "passive-scan" },
        { name: "active-scan" },
    ), TestModule, AiSuggestionModule],
    exports: [BullModule],
    providers: [PassiveScanProcessor, ActiveScanProcessor]
})
export class QueueModule { }