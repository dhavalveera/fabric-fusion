import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Email Module
import { EmailServiceModule } from "src/email-service/email-service.module";

// Controller + Service
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

// Model
import { CustomerDetailsModel } from "./entities/customer-details.entity";
import { CustomerRegistrationsModel } from "./entities/customer-registrations.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDetailsModel, CustomerRegistrationsModel]), EmailServiceModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
