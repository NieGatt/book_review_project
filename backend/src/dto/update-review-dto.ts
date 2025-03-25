import { PickType } from "@nestjs/mapped-types";
import { ReviewDto } from "./review-dto";

export class UpdateReviewDto extends PickType(ReviewDto, ["comment"] as const) { }