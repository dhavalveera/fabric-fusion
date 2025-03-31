import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

// TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// Nestjs JWT
import { JwtModule } from "@nestjs/jwt";

// Controller + Service
import { AdminAuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

// Model
import { AuthModel } from "./entities/auth.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthModel]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AdminAuthService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
