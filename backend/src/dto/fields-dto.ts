import { IsEmail, IsOptional, IsString, Length, Matches } from "class-validator"

export class FieldsDto {
    @IsOptional()
    @Length(3, 50)
    nickname?: string;

    @IsOptional()
    photo?: File;

    @IsString()
    @IsEmail()
    @Length(3, 50)
    email: string;

    @IsString()
    @Length(8, 16)
    @Matches(/^[^\s"'\\<>`]+$/)
    password: string;
}