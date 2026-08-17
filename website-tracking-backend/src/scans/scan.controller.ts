import { Controller, Get, Param, Post } from "@nestjs/common";
import { ScanService } from "./scan.service";

@Controller("test-scans")
export class ScanController {
    constructor(private scanService: ScanService) { }

    @Post("url/:userId")
    start(@Param("url") url: string, @Param("userId") userId: string) {
        return this.scanService.startScan(url, userId)
    }

    @Get(":scanId")
    status(@Param("scanId") scanId: string) {
        return this.scanService.getScanStatus(scanId)
    }

    @Get("getAllTets")
    getAllTets(@Param("userId") userId: string) {
        return this.scanService.getMyTests(userId)
    }

}
