// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

// CONSTANTS (ENUM)
import { AddressTypeEnum } from "../constant";

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty({ message: "First Name is required" })
  @IsString({ message: "First name must be a string" })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Last Name is required" })
  @IsString({ message: "Last name must be a string" })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Phone Number is required" })
  @IsPhoneNumber("IN", { message: "Enter Valid Phone Number" })
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Address is required" })
  @IsString({ message: "Address must be a string" })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: "City is required" })
  @IsString({ message: "City must be a string" })
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: "State is required" })
  @IsString({ message: "State must be a string" })
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Pin Code is required" })
  @IsNumber({ allowNaN: false })
  pinCode: number;

  @ApiProperty({ enumName: "AddressType", enum: AddressTypeEnum })
  @IsNotEmpty({ message: "Address Type is required" })
  @IsEnum(AddressTypeEnum)
  addressType: AddressTypeEnum;

  @ApiProperty()
  @IsBoolean()
  isPrimaryAddress: boolean;
}
