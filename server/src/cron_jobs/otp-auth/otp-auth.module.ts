import { Module } from "@nestjs/common";

// Service
import { OtpAuthService } from "./otp-auth.service";

@Module({
  providers: [OtpAuthService],
})
export class OtpAuthModule {}
