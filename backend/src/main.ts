import { NestFactory } from "@nestjs/core"
import { AppModule } from "./modules/app.module"
import { ValidationPipe } from "@nestjs/common"
import "dotenv/config"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ 
        whitelist: true,
        transform: true
    }))
    app.listen(process.env.PORT ?? 8000)

}
bootstrap()