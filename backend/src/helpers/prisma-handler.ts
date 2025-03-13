import { OnModuleInit, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaHandler extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }
}