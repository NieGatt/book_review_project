import { Get, Put, Controller, Req, Body, Param, UseGuards, ParseUUIDPipe, UseInterceptors, UploadedFile, Patch } from "@nestjs/common"
import { Request } from "express"
import { PasswordDto } from "src/dto/password-dto"
import { VTokenGuard } from "src/guards/vtoken.guard"
import { UserService } from "src/services/user.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { Express } from "express"
import { UpdateDto } from "src/dto/update-dto"
import { multerConfig } from "src/helpers/multer-config"

@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async findData(@Req() req: any) {
        const data = await this.userService.find(req.user.id)
        return data
    }

    @Get(":uuid")
    async findUsersData(
        @Req() req: Request,
        @Param("uuid", new ParseUUIDPipe({ version: "4" })) uuid: string
    ) {
        const data = await this.userService.find(uuid)
        return data
    }

    @Put("reset-password")
    @UseGuards(VTokenGuard)
    async resetPassword(@Req() req: any, @Body() dto: PasswordDto) {
        await this.userService.resetPassword(req.user.id, dto.password)
    }

    @Patch()
    @UseInterceptors(FileInterceptor("file", multerConfig))
    async updateUser(
        @Req() req: any,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UpdateDto
    ) {
        const id = req.user.id
        await this.userService.updateUser(id, { photo: file.path, nickname: dto.nickname })
    }
}