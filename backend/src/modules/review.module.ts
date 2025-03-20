import { Module } from "@nestjs/common";
import { ReviewController } from "src/controllers/review.controller";
import { ReviewService } from "src/services/review.service";

@Module({
    providers: [ReviewService],
    controllers: [ReviewController]
})
export class ReviewModule { }