import { ArrayMinSize, ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsString({ each: true }) // Ensures each element in the array is a string
  @ArrayMinSize(1) // Optionally, enforce a minimum size for the array
  cartIds: Array<string>;
}
