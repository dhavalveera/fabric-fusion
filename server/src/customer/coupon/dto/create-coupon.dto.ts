// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCouponDto {
  @ApiProperty({
    example: "COUPON123",
  })
  @IsNotEmpty({ message: "Coupon Code is required." })
  @IsString({ message: "Coupon Code must be string." })
  couponCode: string;

  @ApiProperty({
    example: "some-random-uuid-one",
  })
  @IsNotEmpty({ message: "Order ID is required." })
  @IsString({ message: "Order ID must be string." })
  orderId: string;

  @ApiProperty({ example: 250 })
  @IsNotEmpty({ message: "Price is required" })
  @IsNumber({ allowNaN: false }, { message: "Price should be Number" })
  @IsPositive()
  price: number;
}
