import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, ValidateIf } from "class-validator";
import { CategoryEnum } from "src/enum/movie-category-enum";
import { MovieTrendingEnum } from "src/enum/movie-trending-enum";

export class MovieParamsDto {
    @ValidateIf(field => !field.id && !field.name && !field.category && !field.trending)
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    genreId?: number;

    @ValidateIf(field => !field.id && !field.genreId && !field.category && !field.trending)
    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    @Matches(/^[a-zA-ZÀ-ú0=9\s_\.,\+-]+$/)
    name?: string

    @ValidateIf(field => !field.id && !field.genreId && !field.name && !field.trending)
    @IsNotEmpty()
    @IsString()
    @IsEnum(CategoryEnum)
    category?: CategoryEnum;

    
    @ValidateIf(field => !field.id && !field.genreId && !field.name && !field.category)
    @IsNotEmpty()
    @IsString()
    @IsEnum(MovieTrendingEnum)
    trending: MovieTrendingEnum;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    page?: number;
}