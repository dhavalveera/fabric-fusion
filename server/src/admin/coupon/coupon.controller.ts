import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Service
import { CouponService } from "./coupon.service";

// DTO (Data Transfer Object)
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";

@Controller("admin/coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post("create")
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get("all")
  findAll() {
    return this.couponService.findAll();
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.couponService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.couponService.remove(id);
  }
}
