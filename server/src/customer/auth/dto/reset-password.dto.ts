// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    example: "NewSecurePassword@123!",
    description: "The new password for the user",
    minLength: 6,
  })
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
  newPassword: string;
}
