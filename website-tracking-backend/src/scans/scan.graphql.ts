import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class TestResultType {
    @Field(() => ID) id: string;
    @Field() category: string;
    @Field() status: string;
    @Field({ nullable: true }) severity?: string;
    @Field(() => GraphQLJSON, { nullable: true }) rawResult?: any;
    @Field({ nullable: true }) aiSuggestion?: string;
}

@ObjectType()
export class WebsiteType {
    @Field(() => ID) id: string;
    @Field() url: string;
    @Field() isVerified: boolean;
    @Field({ nullable: true }) verifiedAt?: Date;
    @Field() createdAt: Date;

}

@ObjectType()
export class ScanType {
    @Field(() => ID) id: string;
    @Field() status: string;
    @Field() scanType: string;
    @Field({ nullable: true }) aiSummary?: string;
    @Field(() => [TestResultType], { nullable: true }) testResults?: TestResultType[];
    @Field({ nullable: true }) completedAt?: Date;
    @Field({ nullable: true }) startedAt?: Date;
    @Field() createdAt: Date;
    @Field(() => WebsiteType, { nullable: true }) website?: WebsiteType;
    @Field(() => Int) testResultsCount?: number
    @Field(() => Int) passedCount?: number
    @Field(() => Int) issueCount?: number
}

@ObjectType()
export class StartScanResponse {
    @Field(() => ScanType) scan: ScanType;
    @Field() skippedActiveTest: boolean;
    @Field() message: string;
}