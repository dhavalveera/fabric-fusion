import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";

// SkipAuth Decorator to Skip the Auth
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Types
import { UserType } from "src/all-types";

// Service
import { CouponService } from "./coupon.service";

// DTO
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Controller("user/coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post("apply")
  @HttpCode(200)
  create(@Body() createCouponDto: CreateCouponDto, @UserInRequest() userInfo: UserType) {
    return this.couponService.create(createCouponDto, userInfo);
  }

  @SkipAuth()
  @Get("all")
  findAll() {
    return this.couponService.findAll();
  }
}
