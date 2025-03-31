import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

// DTO
import { ProductDetailsDto } from "./product-details.dto";
import { CareInstructionDto } from "src/admin/care-instruction/dto/care-instruction.dto";
import { ReturnPolicyDto } from "src/admin/return-policy/dto/return-policy.dto";
import { ProductSizeDto } from "src/admin/product-size/dto/product-size.dto";

export class CreateProductDto {
  @ValidateNested()
  @Type(() => ProductDetailsDto)
  productDetails: ProductDetailsDto;

  @IsNotEmpty()
  @IsString()
  productSubCategoryId: string;

  @IsNotEmpty()
  @IsString()
  productRegionId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CareInstructionDto)
  careInstruction?: CareInstructionDto;

  @IsArray({ always: true, message: "Product Size much be an array only!." })
  @ValidateNested({ each: true, message: "Product Size much be an array only!." })
  @Type(() => ProductSizeDto)
  productSize: ProductSizeDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ReturnPolicyDto)
  returnPolicy?: ReturnPolicyDto;
}
