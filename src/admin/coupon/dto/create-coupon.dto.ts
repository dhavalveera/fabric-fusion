// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from "class-validator";

export class CreateCouponDto {
  @ApiProperty({ example: "COUPON123" })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiPropertyOptional({ example: 20, description: "if Discount Amount is used then this shouldn't hold any values." })
  @IsOptional()
  @IsNumber({ allowNaN: false })
  discountPercentage: number;

  @ApiPropertyOptional({ example: 40, description: "if Discount Percentage is used then this shouldn't hold any values." })
  @IsOptional()
  @IsNumber({ allowNaN: false })
  discountAmount: number;

  @ApiProperty({
    example: "2025-03-31T12:00:00.000Z", // ISO 8601 format
    description: "The start date in ISO format",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: "2025-03-31T12:00:00.000Z", // ISO 8601 format
    description: "The start date in ISO format",
  })
  @IsNotEmpty()
  @IsDateString()
  expiryDate: Date;

  @ApiProperty({ example: 999 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  minimumCartValue: number;

  @ApiProperty({ example: 2999 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  maximumCartValue: number;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  usageLimitPerUser: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  totalQuantity: number;
}
