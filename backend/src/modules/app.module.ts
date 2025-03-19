import { Module, MiddlewareConsumer, RequestMethod, NestModule } from "@nestjs/common";
import { HelperModule } from "./helper.module";
import { AuthModule } from "./auth.module";
import { UserModule } from "./user.module";
import { AuthMiddleware } from "src/middlewares/auth-middleware";
import { UserController } from "src/controllers/user.controller";

@Module({
    imports: [HelperModule, AuthModule, UserModule]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: "user/:uuid", method: RequestMethod.GET },
                { path: "user/reset-password", method: RequestMethod.PUT },
                { path: "user", method: RequestMethod.PATCH }
            )
            .forRoutes(UserController)
    }
}