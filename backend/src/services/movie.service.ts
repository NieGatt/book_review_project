import { Injectable } from "@nestjs/common";
import { PrismaHandler } from "src/helpers/prisma-handler";
import { TmdbApiHandler } from "src/helpers/tmdb-api-handler";
import { CategoryEnum } from "src/enum/movie-category-enum";
import { IMovieParams } from "src/interfaces/imovie-params";

@Injectable()
export class MovieService {
    constructor(
        private prisma: PrismaHandler,
        private tmdbApiHandler: TmdbApiHandler
    ) { }

    async movies(params: IMovieParams) {
        return await this.tmdbApiHandler.movies(params)
    }

    async findMovieData(id: number) {
        return await this.tmdbApiHandler.findMovieData(id)
    }
}