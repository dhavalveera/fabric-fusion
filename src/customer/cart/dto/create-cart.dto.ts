// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateCartDto {
  @ApiProperty({
    example: "1",
  })
  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber({ allowNaN: false })
  productQuantity: number;

  @ApiProperty({
    example: 500,
  })
  @IsNotEmpty({ message: "Product Price is required" })
  @IsNumber({ allowNaN: false })
  perProductPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Product ID is required" })
  @IsUUID()
  productDetailsFk: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Product Size ID is required" })
  @IsUUID()
  productSizeFk: string;
}
