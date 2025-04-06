// Swagger Module
import { ApiPropertyOptional } from "@nestjs/swagger";

import { PartialType } from "@nestjs/mapped-types";
import { CreateProductCategoryDto } from "./create-product-category.dto";

export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {
  @ApiPropertyOptional() // Explicitly define properties to show in Swagger
  productCategoryName?: string;

  @ApiPropertyOptional()
  productCategoryImage?: string;
}
