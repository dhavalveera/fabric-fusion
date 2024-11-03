import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  discountAmount: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  totalAmount: number;

  @IsNotEmpty()
  @IsString()
  orderStatus: string;
}
