import * as bcrypt from "bcryptjs"
import { Injectable } from "@nestjs/common"

@Injectable()
export class HashingHandler {
    hashData(value: string): string {
        return bcrypt.hashSync(value, 10)
    }

    compareData(value1: string, value2: string): boolean {
        return bcrypt.compareSync(value1, value2)
    }
}