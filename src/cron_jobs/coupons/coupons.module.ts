import { Module } from "@nestjs/common";

// Service
import { CronCouponsService } from "./coupons.service";

@Module({
  providers: [CronCouponsService],
})
export class CouponsModule {}
