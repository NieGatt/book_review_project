import * as jwt from "jsonwebtoken"
import { Injectable } from "@nestjs/common"
import "dotenv/config"

@Injectable()
export class JwtHandler {
    private readonly access_secret = process.env.JWT_ACCESS_SECRET
    private readonly vToken_secret = process.env.JWT_VTOKEN_SECRET

    createToken(id: string): string {
        return jwt.sign({ id: id }, this.access_secret, {
            expiresIn: "1d"
        })
    }

    validateAccessToken(token: string) {
        return this.validate(token, this.access_secret)
    }

    createVToken(id: string): string {
        return jwt.sign({ id: id }, this.vToken_secret, {
            expiresIn: "12h"
        })
    }

    validateVToken(token: string) {
        return this.validate(token, this.vToken_secret)
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