// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProductSubCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productSubCategoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productSubCategoryImage: string;
}
