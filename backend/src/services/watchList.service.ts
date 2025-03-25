import { Injectable } from "@nestjs/common";
import { PrismaHandler } from "src/helpers/prisma-handler";
import { TmdbApiHandler } from "src/helpers/tmdb-api-handler";

@Injectable()
export class WatchListService {
    constructor(
        private prisma: PrismaHandler,
        private tmdbApiHandler: TmdbApiHandler
    ) { }

    async findWatchList(userId: string): Promise<any[]> {
        const data = await this.prisma.watchList.findMany({
            where: { userId },
            select: { movieId: true }
        })

        if (data.length === 0) return []

        const movieIds = data.map(obj => obj.movieId);

        const watchList = await this.tmdbApiHandler.list(movieIds)
        return watchList
    }

    async createWatchList(id: string, movieId: number) {
        const listed = await this.prisma.watchList.findUnique({
            where: {
                userId_movieId: {
                    userId: id,
                    movieId
                }
            }
        })
        if (listed) return;
        await this.prisma.watchList.create({ data: { userId: id, movieId } })
    }

    async deleteWatchList(id: string, movieId: number) {
        const listed = await this.prisma.watchList.findUnique({
            where: {
                userId_movieId: {
                    userId: id,
                    movieId
                }
            }
        })
        if (listed) return;
        await this.prisma.watchList.delete({
            where: {
                userId_movieId: {
                    userId: id,
                    movieId
                }
            }
        })
    }
}