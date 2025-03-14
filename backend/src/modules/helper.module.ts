import { PrismaHandler } from "src/helpers/prisma-handler";
import { Module, Global } from "@nestjs/common";
import { HashingHandler } from "src/helpers/hashing-handler";
import { JwtHandler } from "src/helpers/jwt-handler";

@Global()
@Module({
    providers: [PrismaHandler, HashingHandler, JwtHandler],
    exports: [PrismaHandler, HashingHandler, JwtHandler]
})
export class HelperModule { }