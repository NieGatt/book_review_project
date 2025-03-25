import { PickType } from "@nestjs/mapped-types";
import { ReviewDto } from "./review-dto";

export class WatchListParamDto extends PickType(ReviewDto, ["movieId"] as const) { }