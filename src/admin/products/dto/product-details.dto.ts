// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

// Constants
import { Gender } from "../constants/gender";

export class ProductDetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  productPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productDisplayImage: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hsnCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ allowNaN: false })
  gstPercentage?: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Color Option is required" })
  @IsArray({ always: true, message: "Color Options should be Array of Strings" })
  colorOptions: Array<string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fabricType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  styleOfFit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray({ always: true, message: "Tags should be Array" })
  tags: Array<string>;

  @ApiProperty({ enum: Gender, enumName: "Gender", type: () => Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  metaTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  metaDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  metaKeywords: Array<string>;
}
