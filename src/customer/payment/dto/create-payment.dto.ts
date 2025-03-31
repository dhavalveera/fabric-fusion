// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ example: "some-random-uuid" })
  @IsNotEmpty({ message: "Order ID is required" })
  @IsString({ message: "Order ID must be String." })
  orderId: string;

  @ApiPropertyOptional({ example: "some-random-uuid" })
  @IsOptional()
  @IsUUID()
  couponId: string;
}
