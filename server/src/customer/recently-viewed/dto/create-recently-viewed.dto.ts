// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateRecentlyViewedDto {
  @ApiProperty({ example: "some-random-product-uuid" })
  @IsNotEmpty({ message: "Product ID is required." })
  @IsUUID()
  productDetailsFk: string;
}
