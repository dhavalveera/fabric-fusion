// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: ["some-random-uuid-1-one", "some-random-uuid-2-two"],
  })
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsString({ each: true }) // Ensures each element in the array is a string
  @ArrayMinSize(1) // Optionally, enforce a minimum size for the array
  cartIds: Array<string>;
}
