// Swagger Module
import { ApiPropertyOptional } from "@nestjs/swagger";

import { PartialType } from "@nestjs/mapped-types";

// DTO
import { CreateProductSubCategoryDto } from "./create-product-sub-category.dto";

export class UpdateProductSubCategoryDto extends PartialType(CreateProductSubCategoryDto) {
  @ApiPropertyOptional()
  productSubCategoryName: string;

  @ApiPropertyOptional()
  productSubCategoryImage: string;
}
