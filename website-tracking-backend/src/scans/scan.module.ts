import { Module } from "@nestjs/common";
import { QueueModule } from "../queues/queue.module"; 
import { ScanService } from "./scan.service";

@Module({
   imports:[QueueModule],
   providers:[ScanService],
   exports:[ScanService]
})
export class ScanModule { }