import { Controller, Get, Param, Query } from "@nestjs/common";
import { MovieParamsDto } from "src/dto/movie-params-dto";
import { MovieService } from "src/services/movie.service";

@Controller("movie")
export class MovieController {
    constructor(private movieService: MovieService) { }

    @Get()
    async movies(@Query() dto: MovieParamsDto) {
        const movie = await this.movieService.movies(dto)
        return movie
    }

    @Get(":id")
    async findMovieData(@Param("id") id: number) {
        const data = await this.movieService.findMovieData(id);
        return data
    }
}