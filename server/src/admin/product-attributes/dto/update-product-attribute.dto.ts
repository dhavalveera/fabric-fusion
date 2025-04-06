// Swagger Modules
import { ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { PartialType } from "@nestjs/mapped-types";
import { CreateProductAttributeDto } from "./create-product-attribute.dto";

export class UpdateProductAttributeDto extends PartialType(CreateProductAttributeDto) {
  @ApiPropertyOptional()
  updateSubCategory?: boolean;

  @ApiPropertyOptional()
  subCategoryId?: string;
}
