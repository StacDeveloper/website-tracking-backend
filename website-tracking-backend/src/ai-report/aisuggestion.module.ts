import { Module } from "@nestjs/common";
import { AiSuggestionService } from "./aisuggession.service";

@Module({
    providers: [AiSuggestionService],
    exports: [AiSuggestionService]
})
export class AiSuggestionModule { }