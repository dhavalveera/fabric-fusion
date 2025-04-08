// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

// constants
import { Role } from "../constants";

export class VerifyOTPDto {
  @ApiProperty({ description: "Email Address for 2FA OTP", example: "user-name@domain-name.com" })
  @IsNotEmpty()
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  email: string;

  @ApiProperty({ enum: Role, enumName: "status", description: "Type of the User => Admin or User", example: "User" })
  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(Role, { message: "Role must be one of the following values: User or Admin." })
  role: Role;

  @ApiProperty({ description: "2FA OTP", example: "12345", maxLength: 5 })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: "Remember Me should be boolean" })
  rememberMe?: boolean;
}
