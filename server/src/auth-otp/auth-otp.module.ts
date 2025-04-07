import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

// TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// Nestjs JWT
import { JwtModule } from "@nestjs/jwt";

// Email Service
import { EmailServiceModule } from "src/email-service/email-service.module";

// Controller + Service
import { AuthOtpService } from "./auth-otp.service";
import { AuthOtpController } from "./auth-otp.controller";

// Entity/Model
import { AuthOtpModel } from "./entities/auth-otp.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthOtpModel]),

    // JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "7d" },
      }),
    }),

    EmailServiceModule,
  ],
  controllers: [AuthOtpController],
  providers: [AuthOtpService],
  exports: [AuthOtpService],
})
export class AuthOtpModule {}
