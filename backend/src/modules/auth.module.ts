import { AuthController } from "src/services/auth.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [AuthController]
})
export class AuthModule {}