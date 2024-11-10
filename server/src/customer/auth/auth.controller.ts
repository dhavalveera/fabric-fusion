import { Controller, Post, Body } from "@nestjs/common";

// Auth Decorator to Skip Auth Check
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";

// Service
import { AuthService } from "./auth.service";

// DTO (Data Transfer Object)
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import { VerifyOTPDto } from "./dto/verify-otp.dto";

@Controller("auth/user")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post("signup")
  userSignUp(@Body() createAuthDto: SignUpDto) {
    return this.authService.create(createAuthDto);
  }

  @SkipAuth()
  @Post("signin")
  userSignIn(@Body() signInDto: SignInDto) {
    return this.authService.signInService(signInDto);
  }

  @SkipAuth()
  @Post("verify-otp")
  userVerifyOtp(@Body() verifyOtpPayload: VerifyOTPDto) {
    return this.authService.verifyEmailOTPService(verifyOtpPayload);
  }
}
