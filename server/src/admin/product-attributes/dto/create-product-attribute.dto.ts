// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductAttributeDto {
  @ApiProperty({ example: "Sleeve Length", description: "Name of the Attribute" })
  @IsNotEmpty()
  @IsString()
  productAttributeName: string;

  @ApiProperty({ example: "Long", description: "Name of the Value." })
  @IsNotEmpty()
  @IsString()
  productAttributeValue: string;
}
