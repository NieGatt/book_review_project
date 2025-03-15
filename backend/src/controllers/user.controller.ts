import { Get, Put, Controller, Req, Body, Param, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { AuthUserDto } from "src/dto/auth-user.dto"
import { ResetPasswordDto } from "src/dto/reset-password.dto"
import { VTokenGuard } from "src/guards/vtoken.guard"
import { UserService } from "src/services/user.service"

@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async recoverUserData(@Req() req: any) {
        const data = await this.userService.find(req.user.id)
        return data
    }

    @Get(":id")
    async findSomeUser(@Req() req: Request, @Param("id") id: string) {
        const data = await this.userService.find(id)
        return data
    }

    @Put()
    @UseGuards(VTokenGuard)
    async resetPassword(@Req() req: any, @Body() dto: ResetPasswordDto) {
        await this.userService.resetPassword(req.user.id, dto.password)
    }
}