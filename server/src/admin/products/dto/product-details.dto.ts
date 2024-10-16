import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

// Constants
import { Gender } from "../constants/gender";

export class ProductDetailsDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsString()
  brandName: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  productPrice: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productDisplayImage: string;

  @IsOptional()
  @IsString()
  hsnCode?: string;

  @IsOptional()
  @IsNumber({ allowNaN: false })
  gstPercentage?: number;

  @IsNotEmpty({ message: "Color Option is required" })
  @IsArray({ always: true, message: "Color Options should be Array of Strings" })
  colorOptions: Array<string>;

  @IsNotEmpty()
  @IsString()
  fabricType: string;

  @IsNotEmpty()
  @IsString()
  styleOfFit: string;

  @IsNotEmpty()
  @IsArray({ always: true, message: "Tags should be Array" })
  tags: Array<string>;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
