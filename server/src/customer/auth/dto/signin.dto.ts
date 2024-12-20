import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class SignInDto {
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

  @IsOptional()
  @IsBoolean({ message: "Remember Me should be Boolean Value" })
  rememberMe?: boolean;
}
