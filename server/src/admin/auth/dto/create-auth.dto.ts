// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminAuthDto {
  @ApiProperty({ example: "Person Name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "person-name@gmail.com" })
  @IsNotEmpty()
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  email: string;

  @ApiProperty({ example: "SomeRandomPassword@331!" })
  @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;
}

export class SignInAdminAuthDto {
  @ApiProperty({ example: "person-name@gmail.com" })
  @IsNotEmpty()
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  email: string;

  @ApiProperty({ example: "SomeRandomPassword@331!" })
  @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: "Remember Me should be boolean" })
  rememberMe?: boolean;
}

export class AccessToken {
  access_token: string;
}
