import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { JwtHandler } from "src/helpers/jwt-handler";
import { PrismaHandler } from "src/helpers/prisma-handler";

@Injectable()
export class VTokenGuard implements CanActivate {
    constructor(
        private prisma: PrismaHandler,
        private jwt: JwtHandler
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest()

        const vToken = req.headers?.authorization?.split(" ")[1]

        if (!vToken)
            throw new UnauthorizedException("Verification token is missing")

        const id = this.jwt.validateVToken(vToken)

        if (!id)
            throw new UnauthorizedException("Unauthorized verification token")

        const user = await this.prisma.user.findUnique({ where: { id } })

        if (user.vToken !== vToken)
            throw new UnauthorizedException("Unauthorized verification token")

        req.user = { id: id }
        return true
    }
}