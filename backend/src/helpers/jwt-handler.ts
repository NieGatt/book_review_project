import * as jwt from "jsonwebtoken"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import "dotenv/config"

@Injectable()
export class JwtHandler {
    private accessSecret = process.env.JWT_ACCESS_SECRET
    private vTokenSecret = process.env.JWT_VTOKEN_SECRET

    createToken(id: string): string {
        return jwt.sign({ id: id }, this.accessSecret, {
            expiresIn: "1d"
        })
    }

    validateAccessToken(token: string) {
        return this.validate(token, this.accessSecret)
    }

    createVToken(id: string): string {
        return jwt.sign({ id: id }, this.vTokenSecret, {
            expiresIn: "12h"
        })
    }

    validateVToken(token: string) {
        return this.validate(token, this.vTokenSecret)
    }

    private validate(token: string, secret: string): string {
        try {
            const user = jwt.verify(token, secret) as { id: string }
            return user.id
        } catch (err) {
            return null
        }
    }
}