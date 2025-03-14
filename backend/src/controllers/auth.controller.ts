import { Get, Post, Put, Delete, Controller, Req, Body } from "@nestjs/common"
import { Request, Response } from "express"
import { AuthUserDto } from "src/dto/auth-user.dto"
import { AuthService } from "src/services/auth.service"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Req() req: Request, @Body() dto: AuthUserDto): Promise<string> {
        const accessToken = await this.authService.register(dto)
        return accessToken
    }

    @Post("login")
    async login(@Req() req: Request, @Body() dto: AuthUserDto): Promise<string> {
        const accessToken = await this.authService.login(dto) 
        return accessToken
    }
}