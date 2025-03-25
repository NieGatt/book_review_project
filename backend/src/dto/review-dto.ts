import { Transform } from "class-transformer";
import { IsNumber, IsString, Matches } from "class-validator";

export class ReviewDto {
    @IsNumber()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    movieId: number

    @IsString()
    @Matches(/^[^\\<>`\[\]\{\}\/]+$/)
    comment: string
}