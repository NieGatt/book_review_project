import { PickType } from "@nestjs/mapped-types"
import { FieldsDto } from "./fields-dto";
export class EmailDto extends PickType(FieldsDto, ["email"] as const) { }