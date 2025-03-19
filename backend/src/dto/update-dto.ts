import { PickType } from "@nestjs/mapped-types"
import { FieldsDto } from "./fields-dto";
export class UpdateDto extends PickType(FieldsDto, ["nickname"] as const) { }