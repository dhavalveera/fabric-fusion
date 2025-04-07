// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

// constants
import { Role } from "../constants";

export class CreateAuthOtpDto {
  @ApiProperty({ description: "Email Address for 2FA OTP", example: "user-name@domain-name.com" })
  @IsNotEmpty()
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  email: string;

  @ApiProperty({ enum: Role, enumName: "status", description: "Type of the User => Admin or User", example: "User" })
  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(Role, { message: "Role must be one of the following values: User or Admin." })
  role: Role;
}
