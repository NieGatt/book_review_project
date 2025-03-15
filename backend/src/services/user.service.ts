import { Injectable } from "@nestjs/common";
import { HashingHandler } from "src/helpers/hashing-handler";
import { PrismaHandler } from "src/helpers/prisma-handler";


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaHandler,
        private hash: HashingHandler
    ) { }

    async find(id: string) {
        const data = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                photo: true
            }
        })
        return data
    }

    async resetPassword(id: string, password: string) {
        const hashedPass = this.hash.hashData(password)
        await this.prisma.user.update({
            where: { id },
            data: { password: hashedPass }
        })
    }
}