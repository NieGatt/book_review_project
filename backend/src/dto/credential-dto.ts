import { PickType } from "@nestjs/mapped-types"
import { FieldsDto } from "./fields-dto";
export class CredentialDto extends PickType(FieldsDto, ["email", "password"] as const) { }