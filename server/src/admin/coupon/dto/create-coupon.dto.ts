import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from "class-validator";

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsNumber({ allowNaN: false })
  discountPercentage: number;

  @IsOptional()
  @IsNumber({ allowNaN: false })
  discountAmount: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  expiryDate: Date;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  minimumCartValue: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  usageLimitPerUser: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  totalQuantity: number;
}
