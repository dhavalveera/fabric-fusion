// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: ["some-random-cart-ids-one", "some-random-cart-ids-two"],
    description: "will be an Array of Strings holding the Carts ID",
  })
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsString({ each: true }) // Ensures each element in the array is a string
  @ArrayMinSize(1) // Optionally, enforce a minimum size for the array
  cartIds: string[];
}
