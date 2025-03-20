import { IsNumber, IsString, Matches } from "class-validator";

export class ReviewDto {
    @IsNumber()
    movieId: number

    @IsNumber()
    rate: number

    @IsString()
    @Matches(/^[^\\<>`\[\]\{\}\/]+$/)
    comment: string
}