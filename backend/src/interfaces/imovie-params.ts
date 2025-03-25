import { CategoryEnum } from "src/enum/movie-category-enum";
import { MovieTrendingEnum } from "src/enum/movie-trending-enum";

export interface IMovieParams {
    name?: string;
    page?: number;
    genreId?: number;
    category?: CategoryEnum;
    trending: MovieTrendingEnum;
}