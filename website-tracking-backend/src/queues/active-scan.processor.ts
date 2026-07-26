import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { PrismaService } from "prisma/prisma.service";

@Processor("active-test")
export class ActiveClassProcessor extends WorkerHost {
    constructor(private prisma: PrismaService) { super() }

    async process(job: Job) {
        const { scanId, url, category } = job.data
    }

}