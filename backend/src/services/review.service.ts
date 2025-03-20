import { PrismaHandler } from "src/helpers/prisma-handler";
import { BadRequestException, Injectable } from "@nestjs/common";
import { IReviewMovie } from "src/interfaces/ireview-movie";

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaHandler) { }

    async create(userId: string, data: IReviewMovie) {
        const hasReviewed = await this.prisma.review.findUnique({
            where: {
                userId_movieId: {
                    userId, movieId: data.movieId
                }
            }
        })

        if (hasReviewed) return;

        await this.prisma.review.create({
            data: {
                userId, ...data
            }
        })
    }

    async update(userId: string, movieId: number, data: Omit<IReviewMovie, "movieId">) {
        const review = await this.prisma.review.findUnique({
            where: {
                userId_movieId: {
                    userId, movieId
                }
            }
        })

        if (!review) throw new BadRequestException("Review not found");

        await this.prisma.review.update({
            where: {
                userId_movieId: {
                    userId, movieId
                }
            },
            data: { ...data }
        })
    }

    async delete(userId: string, movieId: number) {
        const review = await this.prisma.review.findUnique({
            where: {
                userId_movieId: {
                    userId, movieId
                }
            }
        })

        if (!review) throw new BadRequestException("Review not found");

        await this.prisma.review.delete({
            where: {
                userId_movieId: {
                    userId, movieId
                }
            }
        })
    }
}