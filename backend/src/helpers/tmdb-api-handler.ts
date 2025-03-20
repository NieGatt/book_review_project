import { Injectable } from "@nestjs/common"
import "dotenv/config"

@Injectable()
export class TmdbApiHandler {
    private readonly api_key = process.env.TMDB_KEY;

    async findOne() {}
}