import { OmitType, PartialType } from "@nestjs/mapped-types";

// Swagger Modules
import { ApiPropertyOptional } from "@nestjs/swagger";

// Create Product DTO
import { ProductSizeDto } from "src/admin/product-size/dto/product-size.dto";
import { CreateProductDto } from "./create-product.dto";
import { ProductDetailsDto } from "./product-details.dto";
import { CareInstructionDto } from "src/admin/care-instruction/dto/care-instruction.dto";
import { ReturnPolicyDto } from "src/admin/return-policy/dto/return-policy.dto";

export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, ["productSize"] as const)) {
  @ApiPropertyOptional() // Mark as optional explicitly
  productDetails?: ProductDetailsDto;

  @ApiPropertyOptional()
  productSubCategoryId?: string;

  @ApiPropertyOptional()
  productRegionId?: string;

  @ApiPropertyOptional()
  careInstruction?: CareInstructionDto;

  @ApiPropertyOptional({ type: () => ProductSizeDto })
  productSize?: ProductSizeDto;

  @ApiPropertyOptional()
  returnPolicy?: ReturnPolicyDto;
}
