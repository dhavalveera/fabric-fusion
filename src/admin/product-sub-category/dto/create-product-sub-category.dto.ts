import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProductSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  productSubCategoryName: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productSubCategoryImage: string;
}
