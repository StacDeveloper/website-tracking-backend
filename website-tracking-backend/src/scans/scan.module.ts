import { Module } from "@nestjs/common";
import { QueueModule } from "../queues/queue.module";
import { ScanService } from "./scan.service";
import { ScanController } from "./scan.controller";
import { ScanResolver } from "./scan.resolver";

@Module({
   imports: [QueueModule],
   providers: [ScanService, ScanResolver],
   exports: [ScanService],
   controllers: [ScanController]
})
export class ScanModule { }