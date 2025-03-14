import * as jwt from "jsonwebtoken"
import { Injectable } from "@nestjs/common"
import "dotenv/config"

@Injectable()
export class JwtHandler {
    createToken(id: string): string {
        return jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
    }
}