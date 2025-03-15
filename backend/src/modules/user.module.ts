import { Module, MiddlewareConsumer, RequestMethod, NestModule } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { AuthMiddleware } from "src/middlewares/auth-middleware";
import { UserService } from "src/services/user.service";

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: "user/:id", method: RequestMethod.GET },
                { path: "user", method: RequestMethod.PUT }
            )
            .forRoutes("user")
    }
}