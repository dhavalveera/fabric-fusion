import { PartialType } from "@nestjs/mapped-types";

// Swagger Modules
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateCouponDto } from "./create-coupon.dto";

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @ApiPropertyOptional({ example: "COUPON123" })
  code?: string;

  @ApiPropertyOptional({ example: 20, description: "if Discount Amount is used then this shouldn't hold any values." })
  discountAmount?: number;

  @ApiPropertyOptional({ example: 40, description: "if Discount Percentage is used then this shouldn't hold any values." })
  discountPercentage?: number;

  @ApiPropertyOptional({
    example: "2025-03-31T12:00:00.000Z", // ISO 8601 format
    description: "The start date in ISO format",
  })
  expiryDate?: Date;

  @ApiPropertyOptional()
  maximumCartValue?: number;

  @ApiPropertyOptional({ example: 999 })
  minimumCartValue?: number;

  @ApiPropertyOptional({
    example: "2025-03-31T12:00:00.000Z", // ISO 8601 format
    description: "The start date in ISO format",
  })
  startDate?: Date;

  @ApiPropertyOptional({ example: 2 })
  totalQuantity?: number;

  @ApiPropertyOptional({ example: 3 })
  usageLimitPerUser?: number;
}
