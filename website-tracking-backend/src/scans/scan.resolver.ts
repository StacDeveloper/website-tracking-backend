import { Args, Mutation, Resolver, ID, Query, Subscription } from "@nestjs/graphql";
import { ScanService } from "./scan.service";
import { ScanType, StartScanResponse } from "./scan.graphql";
import { pubsub } from "../queues/pubsub.provider";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/currrent-user.decorator";



@Resolver()
export class ScanResolver {
    constructor(private scansService: ScanService) { }

    @UseGuards(AuthGuard)
    @Mutation(() => StartScanResponse)
    async startScan(
        @Args("url", { type: () => ID }) url: string,
        @CurrentUser() user: any
    ) {
        return this.scansService.startScan(url, user.id)
    }

    @UseGuards(AuthGuard)
    @Query(() => ScanType)
    async scanStatus(
        @Args("scanId", { type: () => ID }) scanId: string
    ) {
        return this.scansService.getScanStatus(scanId)
    }

    @Subscription(() => ScanType, {
        filter: (payload, variables) => payload.scanUpdated.id === variables.scanId
    })
    scanUpdated(@Args("scanId", { type: () => ID }) scanId: string) {
        return pubsub.asyncIterableIterator("scanUpdated")
    }
    @UseGuards(AuthGuard)
    @Query(() => [ScanType])
    async getAlluserTests(@CurrentUser() user: any) {
        return this.scansService.getMyTests(user.id)
    }

}