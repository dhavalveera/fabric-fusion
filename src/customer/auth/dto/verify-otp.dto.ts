// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class VerifyOTPDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  customerRegistrationId: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Email Address is required" })
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  @Transform(({ value }) => value?.trim()) // Trim the string value to avoid leading/trailing spaces
  emailAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  otpCode: number;
}

export class AccessToken {
  access_token: string;
}
