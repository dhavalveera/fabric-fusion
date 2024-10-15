import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Size } from "../constants/size";

export class ProductSizeDto {
  @IsNotEmpty()
  @IsString({ message: "Product Size should be string" })
  @IsEnum(Size)
  size: Size;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  totalStock: number;
}
