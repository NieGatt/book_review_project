import { Delete, Post, Put, Controller, Req, Body, Param } from "@nestjs/common"
import { ReviewDto } from "src/dto/review-dto";
import { ReviewService } from "src/services/review.service";
import { UpdateReviewDto } from "src/dto/update-review-dto";

@Controller("review")
export class ReviewController {
    constructor(private reviewService: ReviewService) { }

    @Post()
    async createReview(@Req() req: any, @Body() dto: ReviewDto) {
        const userId = req.user.userId
        await this.reviewService.create(userId, dto)
    }

    @Put()
    async updateReview(
        @Req() req: any,
        @Param("movieId") movieId: number,
        @Body() dto: UpdateReviewDto
    ) {
        const userId = req.user.userId
        await this.reviewService.update(userId, movieId, dto)
    }

    @Delete()
    async deleteReview(@Req() req: any, @Param("movieId") movieId: number) {
        const userId = req.user.userId
        await this.reviewService.delete(userId, movieId)
    }
}