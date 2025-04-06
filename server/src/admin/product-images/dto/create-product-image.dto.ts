// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProductImagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  productImageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageAltText: string;
}
