// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user requesting a password reset",
  })
  @IsNotEmpty({ message: "Email address is required" })
  @IsEmail({ allow_underscores: true }, { message: "Invalid email format" })
  emailAddress: string;
}
