import { Injectable } from "@nestjs/common"
import "dotenv/config"
import { CategoryEnum } from "src/enum/movie-category-enum";
import { IMovieParams } from "src/interfaces/imovie-params";
import { IMoviesData } from "src/interfaces/imovies-data";
import { PrismaHandler } from "./prisma-handler";
import { MovieTrendingEnum } from "src/enum/movie-trending-enum";

@Injectable()
export class TmdbApiHandler {
    private readonly api_key = process.env.TMDB_KEY;
    private readonly baseUrl = 'https://api.themoviedb.org/3/'

    async movies(params: IMovieParams) {
        let url = this.baseUrl
        let result: IMoviesData | {} = {}

        switch (true) {
            case typeof params.genreId === "string":
                url += `discover/movie?with_genres=${params.genreId}&api_key=${this.api_key}&page=${params.page ?? 1}`;
                break;

            case typeof params.name === "string":
                url += `search/movie?query=${params.name}&page=${params.page ?? 1}&api_key=${this.api_key}`;
                break;

            case Object.values(CategoryEnum).includes(params.category):
                url = `${this.baseUrl}movie/${params.category}?page=${params.page ?? 1}&api_key=${this.api_key}`;
                break;

            case Object.values(MovieTrendingEnum).includes(params.trending):
                url = `${this.baseUrl}trending/movie/${params.trending}?api_key=${this.api_key}`;
                break;
        }

        const res = await fetch(url)
        const data = await res.json() as IMoviesData

        if (res.ok && data?.results?.length > 0) {
            result = {
                page: data.page,
                total_pages: data.total_pages,
                total_results: data.total_results,
                results: data.results.map(movie => ({
                    id: movie.id,
                    poster: movie.poster_path,
                    title: movie.title,
                    release_date: movie.release_date
                }))
            }
        }

        return result
    }

    async findMovieData(id: number) {
        const url = `${this.baseUrl}movie/${id}?api_key=${this.api_key}`;
        const url2 = `${this.baseUrl}movie/${id}/credits?api_key=${this.api_key}`;

        let details = {};
        let team = {};

        const response = await fetch(url);
        const response2 = await fetch(url2);

        if (response.ok && response2.ok) {
            const data = await response.json();
            const data2 = await response2.json();

            details = {
                id: data.id,
                title: data.title,
                overview: data.overview,
                genres: data.genres.map((genre: any) => ({
                    id: genre.id,
                    name: genre.name
                })),
                release_date: data.release_date,
                poster: data.poster_path,
                backdrop: data.backdrop_path,
                runtime: data.runtime
            }

            team = {
                cast: data2.cast,
                crew: data2.crew
            }
        }

        return { details, team }
    }

    async list(ids: number[]) {
        const movies = [];
        for (const id of ids) {
            const res = await fetch(`${this.baseUrl}movie/${id}`);
            const data = await res.json();

            const movie = {
                id: data.id,
                title: data.title,
                poster: data.backdrop_path,
                overview: data.overview
            }

            movies.push(movie);
        }

        return movies
    }
}