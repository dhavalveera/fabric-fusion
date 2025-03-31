import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DeliveryModuleDto {
  @IsNotEmpty()
  @IsString()
  courierCompany: string;

  @IsNotEmpty()
  @IsString()
  trackingNumber: string;

  @IsNotEmpty()
  @IsDateString()
  expectedDeliveryDate: Date;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderStatus: string;

  @IsOptional()
  @Type(() => DeliveryModuleDto)
  deliveryData?: DeliveryModuleDto;
}
