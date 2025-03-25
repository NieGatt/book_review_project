import { Module } from "@nestjs/common";
import { MovieController } from "src/controllers/movie.controller";
import { TmdbApiHandler } from "src/helpers/tmdb-api-handler";
import { MovieService } from "src/services/movie.service";

@Module({
    providers: [MovieService, TmdbApiHandler],
    controllers: [MovieController]
})
export class MovieModule {}