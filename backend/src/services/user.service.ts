import { BadRequestException, Injectable } from "@nestjs/common";
import { HashingHandler } from "src/helpers/hashing-handler";
import { PrismaHandler } from "src/helpers/prisma-handler";
import { IUpdateUser } from "src/interfaces/iupdate-user";


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

    async updateUser(id: string, data: IUpdateUser) {
        let insert: Partial<IUpdateUser> = {}

        Object.keys(data).forEach((key) => {
            const typedKey = key as keyof IUpdateUser;
            if (data[typedKey] !== undefined) insert[typedKey] = data[typedKey]
        })

        if (Object.keys(insert).length === 0)
            throw new BadRequestException("At least one field is required")

        await this.prisma.user.update({
            where: { id },
            data: { ...insert }
        })
    }
}