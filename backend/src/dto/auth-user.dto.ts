import { IsEmail, IsString, Length, Matches } from "class-validator"

export class AuthUserDto {
    @IsString()
    @IsEmail()
    @Length(3, 50)
    email: string;

    @IsString()
    @Length(8, 16)
    @Matches(/^[^\s"'\\<>`]+$/)
    password: string;
}