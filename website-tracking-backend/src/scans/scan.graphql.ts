import { ObjectType, Field, ID } from "@nestjs/graphql"
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
export class ScanType {
    @Field(() => ID) id: string;
    @Field() status: string;
    @Field() scanType: string;
    @Field({ nullable: true }) aiSummary?: string
    @Field(() => [TestResultType], { nullable: true }) testResults?: TestResultType[]
}

@ObjectType()
export class StartScanResponse {
    @Field(() => ScanType) scan: ScanType;
    @Field() skippedActiveTest: boolean;
    @Field() message: string;
}