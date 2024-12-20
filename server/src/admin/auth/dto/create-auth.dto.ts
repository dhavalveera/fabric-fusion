export class CreateAuthDto {}
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;
}

export class SignInAdminAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;

  @IsOptional()
  @IsBoolean({ message: "Remember Me should be boolean" })
  rememberMe?: boolean;
}

export class AccessToken {
  access_token: string;
}
