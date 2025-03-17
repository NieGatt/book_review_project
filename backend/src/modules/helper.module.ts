import { PrismaHandler } from "src/helpers/prisma-handler";
import { Module, Global } from "@nestjs/common";
import { HashingHandler } from "src/helpers/hashing-handler";
import { JwtHandler } from "src/helpers/jwt-handler";
import { TemplateHandler } from "src/helpers/template-handler";
import { SendEmailHandler } from "src/helpers/send-email-handler";

@Global()
@Module({
    providers: [
        PrismaHandler, HashingHandler, JwtHandler,
        TemplateHandler, SendEmailHandler
    ],
    exports: [
        PrismaHandler, HashingHandler, JwtHandler,
        TemplateHandler, SendEmailHandler
    ]
})
export class HelperModule { }