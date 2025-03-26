import { Module } from "@nestjs/common";
import { WatchListController } from "src/controllers/watchlist.controller";
import { TmdbApiHandler } from "src/helpers/tmdb-api-handler";
import { WatchListService } from "src/services/watchList.service";

@Module({
    controllers: [WatchListController],
    providers: [WatchListService, TmdbApiHandler]
})
export class WatchListModule {}