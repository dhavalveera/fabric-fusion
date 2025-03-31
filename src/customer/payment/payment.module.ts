import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Utils Modue
import { UtilsServiceModule } from "src/payment-utils/payment-utils.module";

// Controller + Service
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

// Model
import { PaymentDetailsModel } from "./entities/payment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetailsModel]), UtilsServiceModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [TypeOrmModule],
})
export class PaymentModule {}
