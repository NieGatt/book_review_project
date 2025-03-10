import { NestFactory } from "@nestjs/core"
import { AppModule } from "./modules/app.module"
import "dotenv/config"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.listen(process.env.PORT)
}
bootstrap()