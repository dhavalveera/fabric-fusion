import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

// DTO
import { ProductDetailsDto } from "./product-details.dto";
import { CareInstructionDto } from "./care-instruction.dto";
import { ReturnPolicyDto } from "./return-policy.dto";
import { ProductSizeDto } from "src/admin/product-sizes/dto/product-size.dto";

export class CreateProductDto {
  @ValidateNested()
  @Type(() => ProductDetailsDto)
  productDetails: ProductDetailsDto;

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
