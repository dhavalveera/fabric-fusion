export class CreateAuthDto {}
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

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
}

export class AccessToken {
  access_token: string;
}
