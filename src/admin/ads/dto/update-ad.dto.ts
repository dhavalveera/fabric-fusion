import { PartialType } from "@nestjs/mapped-types";

// Swagger Modules
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateAdDto } from "./create-ad.dto";

export class UpdateAdDto extends PartialType(CreateAdDto) {
  @ApiPropertyOptional({
    example: "https://images.google.com/some-image-name-two.png",
  })
  adsImageUrl?: string;

  @ApiPropertyOptional({ example: "some Title" })
  imgTitle?: string;
}
