import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

@Module({
    imports: [BullModule.registerQueue(
        { name: "passive-scan" },
        { name: "active-scan" },
    )],
    exports: [BullModule]
})
export class ScanModule { }