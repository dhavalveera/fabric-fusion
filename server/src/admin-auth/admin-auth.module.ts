import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

// Model
import { AdminRegistrations } from "./models/adminRegistration.model";

// Controller + Service
import { AdminAuthService } from "./admin-auth.service";
import { AdminAuthController } from "./admin-auth.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRegistrations]),
    JwtModule.register({
      global: true,
      secret: "FabricFusionJWTSecret",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
