import { IsEmail, IsOptional, IsString, Length, Matches } from "class-validator"

export class FieldsDto {
    @IsOptional()
    @Length(3, 50)
    @Matches(/[a-zA-ZÀ-ú\s_]/)
    nickname: string;

    @IsString()
    @IsEmail()
    @Length(3, 50)
    email: string;

    @IsString()
    @Length(8, 16)
    @Matches(/^[^\s"'\\<>`]+$/)
    password: string;
}