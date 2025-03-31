import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { AddressTypeEnum } from "../constant";

export class CreateAddressDto {
  @IsNotEmpty({ message: "First Name is required" })
  @IsString({ message: "First name must be a string" })
  firstName: string;

  @IsNotEmpty({ message: "Last Name is required" })
  @IsString({ message: "Last name must be a string" })
  lastName: string;

  @IsNotEmpty({ message: "Phone Number is required" })
  @IsPhoneNumber("IN", { message: "Enter Valid Phone Number" })
  phoneNumber: string;

  @IsNotEmpty({ message: "Address is required" })
  @IsString({ message: "Address must be a string" })
  address: string;

  @IsNotEmpty({ message: "City is required" })
  @IsString({ message: "City must be a string" })
  city: string;

  @IsNotEmpty({ message: "State is required" })
  @IsString({ message: "State must be a string" })
  state: string;

  @IsNotEmpty({ message: "Pin Code is required" })
  @IsNumber({ allowNaN: false })
  pinCode: number;

  @IsNotEmpty({ message: "Address Type is required" })
  @IsEnum(AddressTypeEnum)
  addressType: AddressTypeEnum;

  @IsBoolean()
  isPrimaryAddress: boolean;
}
