import { Module } from "@nestjs/common";

// TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// 2FA OTP Module
import { AuthOtpModule } from "src/auth-otp/auth-otp.module";

// Controller + Service
import { AdminAuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

// Model
import { AuthModel } from "./entities/auth.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthModel]),

    // 2FA OTP Module
    AuthOtpModule,
  ],
  controllers: [AuthController],
  providers: [AdminAuthService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
