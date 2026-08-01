import { Module } from "@nestjs/common";
import { QueueModule } from "../queues/queue.module"; 
import { ScanService } from "./scan.service";
import { ScanController } from "./scan.controller";

@Module({
   imports:[QueueModule],
   providers:[ScanService],
   exports:[ScanService],
   controllers:[ScanController]
})
export class ScanModule { }