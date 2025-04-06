// Model
import { CouponDetailsModel } from "src/admin/coupon/entities/coupon.entity";

type ApplyCouponPayload = {
  price: number;
};

export const isCouponPriceBetween = (isCouponAvailable: CouponDetailsModel, applyCouponPayload: ApplyCouponPayload): boolean => {
  if (applyCouponPayload.price >= isCouponAvailable.minimumCartValue && applyCouponPayload.price <= isCouponAvailable.maximumCartValue) {
    return true;
  } else {
    return false;
  }
};
