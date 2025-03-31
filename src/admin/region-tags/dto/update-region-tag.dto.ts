import { PartialType } from "@nestjs/mapped-types";
import { CreateRegionTagDto } from "./create-region-tag.dto";

export class UpdateRegionTagDto extends PartialType(CreateRegionTagDto) {}
