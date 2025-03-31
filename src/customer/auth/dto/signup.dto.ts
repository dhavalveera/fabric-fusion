import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, ValidateNested } from "class-validator";

export class CustomerDetailsDto {
  @IsNotEmpty({ message: "First Name is required" })
  @IsString({ message: "First name must be a string" })
  @Transform(({ value }) => value?.trim()) // Trim the string value to avoid leading/trailing spaces
  firstName: string;

  @IsNotEmpty({ message: "Last Name is required" })
  @IsString({ message: "Last Name must be a string" })
  @Transform(({ value }) => value?.trim()) // Trim the string value to avoid leading/trailing spaces
  lastName: string;
}

export class CustomerRegDto {
  @IsNotEmpty({ message: "Email Address is required" })
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  @Transform(({ value }) => value?.trim()) // Trim the string value to avoid leading/trailing spaces
  emailAddress: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @IsStrongPassword(
    {
      minLength: 8, // Minimum length of 8 characters
      minLowercase: 1, // At least one lowercase letter
      minUppercase: 1, // At least one uppercase letter
      minNumbers: 1, // At least one number
      minSymbols: 1, // At least one symbol
    },
    { message: "Password must be at least 8 characters long and contain at least one lowercase, one uppercase letter, one number, and one symbol." },
  )
  password: string;
}

export class SignUpDto {
  @ValidateNested()
  @Type(() => CustomerDetailsDto)
  @IsNotEmpty({ message: "Customer Details are required" })
  customerDetails: CustomerDetailsDto;

  @ValidateNested()
  @Type(() => CustomerRegDto)
  @IsNotEmpty({ message: "Customer Registration are required" })
  customerRegistration: CustomerRegDto;
}
