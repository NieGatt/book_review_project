import { Controller, Get, Post, Delete, Req, Body, Param } from "@nestjs/common";
import { WatchListParamDto } from "src/dto/watchlist-param-dto";
import { WatchListService } from "src/services/watchList.service";

@Controller("watch-list")
export class WatchListController {
    constructor(private watchListService: WatchListService) { }

    @Get()
    async findWatchList(@Req() req: any) {
        const { id } = req.user
        const watchList = await this.watchListService.findWatchList(id)
        return watchList
    }

    @Post()
    async createWatchList(@Req() req: any, @Body() dto: WatchListParamDto) {
        const { id } = req.user
        await this.watchListService.createWatchList(id, dto.movieId)
    }

    @Delete(":movieId")
    async deleteWatchList(@Req() req: any, @Param() dto: WatchListParamDto) {
        const { id } = req.user
        await this.watchListService.deleteWatchList(id, dto.movieId)
    }
}