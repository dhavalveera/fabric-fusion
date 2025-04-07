import { Controller, Body, Get, Patch, Post } from "@nestjs/common";

// Auth Skipper
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";

// Service
import { AuthOtpService } from "./auth-otp.service";

// DTO
import { CreateAuthOtpDto } from "./dto/create-auth-otp.dto";
import { VerifyOTPDto } from "./dto/verify-otp.dto";

@Controller("auth")
export class AuthOtpController {
  constructor(private readonly authOtpService: AuthOtpService) {}

  @SkipAuth()
  @Post("verify/otp")
  async verifyOtp(@Body() verifyOtpDto: VerifyOTPDto) {
    return this.authOtpService.verifyOtp(verifyOtpDto);
  }

  @SkipAuth()
  @Patch("resend/otp")
  resendOtp(@Body() resendDto: CreateAuthOtpDto) {
    return this.authOtpService.resendOtp(resendDto);
  }
}
