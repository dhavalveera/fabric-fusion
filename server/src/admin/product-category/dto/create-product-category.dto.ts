import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  productCategoryName: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productCategoryImage: string;
}
