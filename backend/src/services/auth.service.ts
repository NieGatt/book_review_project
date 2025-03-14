import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { HashingHandler } from "src/helpers/hashing-handler";
import { JwtHandler } from "src/helpers/jwt-handler";
import { PrismaHandler } from "src/helpers/prisma-handler";
import { IAuthUser } from "src/interfaces/iauth-user";
import { v4 as uuid } from "uuid"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaHandler,
        private hash: HashingHandler,
        private jwt: JwtHandler
    ) { }

    async register(data: IAuthUser): Promise<string> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (user) throw new ConflictException("Email already in use")

        const hashedPass = this.hash.hashData(data.password)
        const newUser = await this.prisma.user.create({
            data: {
                id: uuid(),
                email: data.email,
                password: hashedPass
            }
        })

        const accessToken = this.jwt.createToken(newUser.id)
        return accessToken
    }

    async login(data: IAuthUser): Promise<string> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        const passMatch = this.hash.compareData(data.password, user?.password ?? "")

        if (!passMatch) throw new NotFoundException("Incorrect email or password")

        const accessToken = this.jwt.createToken(user.id)
        return accessToken
    }
}