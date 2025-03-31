import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProductImagesDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productImageUrl: string;

  @IsNotEmpty()
  @IsString()
  imageAltText: string;
}
