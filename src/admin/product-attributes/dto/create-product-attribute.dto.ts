import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductAttributeDto {
  @IsNotEmpty()
  @IsString()
  productAttributeName: string;

  @IsNotEmpty()
  @IsString()
  productAttributeValue: string;
}
