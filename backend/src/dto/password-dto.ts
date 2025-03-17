import { PickType } from "@nestjs/mapped-types"
import { FieldsDto } from "./fields-dto";
export class PasswordDto extends PickType(FieldsDto, ["password"] as const) { }