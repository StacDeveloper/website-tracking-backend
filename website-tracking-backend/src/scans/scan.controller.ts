import { Controller, Get, Param, Post } from "@nestjs/common";
import { ScanService } from "./scan.service";

@Controller("test-scans")
export class ScanController {
    constructor(private scanService: ScanService) { }

    @Post(":/websiteId/:userId")
    start(@Param("websiteId") wesbiteId: string, @Param("userId") userId: string) {
        return this.scanService.startScan(wesbiteId, userId)
    }

    @Get(":scanId")
    status(@Param("scanId") scanId: string) {
        return this.scanService.getScanStatus(scanId)
    }


}
