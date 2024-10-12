import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  productSubCategoryName: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productSubCategoryImage: string;
}
