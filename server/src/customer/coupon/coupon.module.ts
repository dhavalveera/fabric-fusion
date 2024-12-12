import { Module } from "@nestjs/common";

// Controller + Service
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";

@Module({
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
