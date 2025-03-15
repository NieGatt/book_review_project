import { IsString, Length, Matches } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @Length(8, 16)
    @Matches(/^[^\s"'\\<>`]+$/)
    password: string;
}