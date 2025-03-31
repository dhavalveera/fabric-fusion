import { PartialType } from "@nestjs/mapped-types";

// Swagger Modules
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateRegionTagDto } from "./create-region-tag.dto";

export class UpdateRegionTagDto extends PartialType(CreateRegionTagDto) {
  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  regionTagName?: string;
}
