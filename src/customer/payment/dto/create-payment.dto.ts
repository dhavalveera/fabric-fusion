import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePaymentDto {
  @IsNotEmpty({ message: "Order ID is required" })
  @IsString({ message: "Order ID must be String." })
  orderId: string;

  @IsOptional()
  @IsUUID()
  couponId: string;
}
