import { Module } from "@nestjs/common";
import { WatchListController } from "src/controllers/watchlist.controller";
import { WatchListService } from "src/services/watchList.service";

@Module({
    controllers: [WatchListController],
    providers: [WatchListService]
})
export class WatchListModule {}