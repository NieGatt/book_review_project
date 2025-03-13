import { PrismaHandler } from "src/helpers/prisma-handler";
import { Module, Global } from "@nestjs/common";

@Global()
@Module({
    providers: [PrismaHandler],
    exports: [PrismaHandler]
})
export class HelperModule { }