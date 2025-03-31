import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";

// Models
import { CouponDetailsModel } from "./entities/coupon.entity";
import { CouponUsageModel } from "./entities/coupon-usage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CouponDetailsModel, CouponUsageModel])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [TypeOrmModule],
})
export class CouponModule {}
