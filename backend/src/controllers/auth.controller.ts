import { Post, Controller, Req, Body, Param, Get } from "@nestjs/common"
import { Request } from "express"
import { CredentialDto } from "src/dto/credential-dto"
import { EmailDto } from "src/dto/email-dto"
import { AuthService } from "src/services/auth.service"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Req() req: Request, @Body() dto: CredentialDto): Promise<string> {
        const accessToken = await this.authService.register(dto)
        return accessToken
    }

    @Post("login")
    async login(@Req() req: Request, @Body() dto: CredentialDto): Promise<string> {
        const accessToken = await this.authService.login(dto)
        return accessToken
    }

    @Get("forgot-password/:email")
    async sendVerification(@Req() req: Request, @Param() dto: EmailDto) {
        await this.authService.sendVerification(dto.email)
    }
}