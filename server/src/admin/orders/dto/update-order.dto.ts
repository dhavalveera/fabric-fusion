// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DeliveryModuleDto {
  @ApiProperty({ example: "Delhivery", description: "Name of the Courier/Logistic Company through which Product will be shipped!." })
  @IsNotEmpty()
  @IsString()
  courierCompany: string;

  @ApiProperty({ example: "some-random-tracking-number", description: "It" })
  @IsNotEmpty()
  @IsString()
  trackingNumber: string;

  @ApiProperty({
    example: "2025-03-31T12:00:00.000Z", // ISO 8601 format
    description: "The start date in ISO format",
  })
  @IsNotEmpty()
  @IsDateString()
  expectedDeliveryDate: Date;
}

export class UpdateOrderDto {
  @ApiProperty({
    example: "Status of Order",
  })
  @IsNotEmpty()
  @IsString()
  orderStatus: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => DeliveryModuleDto)
  deliveryData?: DeliveryModuleDto;
}
