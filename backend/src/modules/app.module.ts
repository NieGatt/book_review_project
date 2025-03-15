import { Module } from "@nestjs/common"
import { HelperModule } from "./helper.module";
import { AuthModule } from "./auth.module";
import { UserModule } from "./user.module";

@Module({
    imports: [HelperModule, AuthModule, UserModule]
})
export class AppModule { }