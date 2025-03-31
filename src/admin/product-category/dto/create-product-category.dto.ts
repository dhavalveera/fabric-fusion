// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProductCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productCategoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productCategoryImage: string;
}
