// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Size } from "../constants/size";

export class ProductSizeDto {
  @ApiProperty({ enum: Size, enumName: "Size", type: () => Size })
  @IsNotEmpty()
  @IsString({ message: "Product Size should be string" })
  @IsEnum(Size)
  size: Size;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  totalStock: number;
}
