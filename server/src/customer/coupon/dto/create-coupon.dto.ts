import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCouponDto {
  @IsNotEmpty({ message: "Coupon Code is required." })
  @IsString({ message: "Coupon Code must be string." })
  couponCode: string;

  @IsNotEmpty({ message: "Order ID is required." })
  @IsString({ message: "Order ID must be string." })
  orderId: string;

  @IsNotEmpty({ message: "Price is required" })
  @IsNumber({ allowNaN: false }, { message: "Price should be Number" })
  @IsPositive()
  price: number;
}
