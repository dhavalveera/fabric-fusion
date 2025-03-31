import { PartialType } from "@nestjs/mapped-types";

// Swagger Modules
import { ApiPropertyOptional } from "@nestjs/swagger";

import { CreateAddressDto } from "./create-address.dto";
import { AddressTypeEnum } from "../constant";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional({ enumName: "AddressType", enum: AddressTypeEnum })
  addressType?: AddressTypeEnum;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  isPrimaryAddress?: boolean;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  pinCode?: number;

  @ApiPropertyOptional()
  state?: string;
}
