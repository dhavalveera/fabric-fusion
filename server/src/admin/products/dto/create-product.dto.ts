// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
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
  @ApiProperty()
  productDetails: ProductDetailsDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productSubCategoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productRegionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CareInstructionDto)
  careInstruction?: CareInstructionDto;

  @ApiProperty({
    type: () => [ProductSizeDto], // Explicitly specify the type
    description: "Array of product sizes",
  })
  @IsArray({ always: true, message: "Product Size much be an array only!." })
  @ValidateNested({ each: true, message: "Product Size much be an array only!." })
  @Type(() => ProductSizeDto)
  productSize: ProductSizeDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => ReturnPolicyDto)
  returnPolicy?: ReturnPolicyDto;
}
