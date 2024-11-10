import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class VerifyOTPDto {
  @IsNotEmpty()
  @IsUUID()
  customerRegistrationId: string;

  @IsNotEmpty({ message: "Email Address is required" })
  @IsEmail({ allow_underscores: true }, { message: "Invalid Email Address." })
  @Transform(({ value }) => value?.trim()) // Trim the string value to avoid leading/trailing spaces
  emailAddress: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  otpCode: number;
}

export class AccessToken {
  access_token: string;
}
