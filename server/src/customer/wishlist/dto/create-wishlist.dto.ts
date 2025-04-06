// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateWishlistDto {
  @ApiProperty({ example: "some-random-product-uuid" })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productDetailsFk: string;
}
