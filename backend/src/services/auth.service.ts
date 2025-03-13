import { Get, Post, Put, Delete, Controller } from "@nestjs/common"

@Controller("auth")
export class AuthController {
    constructor() { }

    @Post("register")
    async register() { }

    @Post("login")
    async login() { }

    @Post("logout")
    async logout() { }
}