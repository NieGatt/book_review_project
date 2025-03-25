import { Injectable } from "@nestjs/common";
import { PrismaHandler } from "src/helpers/prisma-handler";
import { TmdbApiHandler } from "src/helpers/tmdb-api-handler";
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
        const movie = await this.tmdbApiHandler.findMovieData(id)
        const reviews = await this.prisma.review.findMany({ where: { movieId: id } });
        return { movie, reviews }
    }
}