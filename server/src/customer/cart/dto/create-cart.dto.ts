import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber({ allowNaN: false })
  productQuantity: number;

  @IsNotEmpty({ message: "Product Price is required" })
  @IsNumber({ allowNaN: false })
  perProductPrice: number;

  @IsNotEmpty({ message: "Product ID is required" })
  @IsUUID()
  productDetailsFk: string;
}
