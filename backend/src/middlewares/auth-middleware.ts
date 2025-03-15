import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { JwtHandler } from "src/helpers/jwt-handler";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwt: JwtHandler) { }
    use(req: any, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization

        if (!authHeader)
            return next(new UnauthorizedException("Authorization header is missing"))

        const accessToken = authHeader.split(" ")[1]

        if (!accessToken)
            return next(new UnauthorizedException("Access token is missing"))

        const id = this.jwt.validateAccessToken(accessToken)

        if (!id)
            return next(new UnauthorizedException("Unauthorized access token"))

        req.user = { id: id }
        next()
    }
}