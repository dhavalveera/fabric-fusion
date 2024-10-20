import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";

// Common Base Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Coupons Model
import { CouponDetailsModel } from "./coupon.entity";

@Entity({ name: "couponUsage" })
export class CouponUsageModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  couponUsageId: string;

  @Column({ type: "integer", default: 1 })
  usageCount: number; // Number of times a user has used this coupon.

  @ManyToOne(() => CouponDetailsModel, coupon => coupon.couponUsagesId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "couponDetailsId" })
  couponDetailsId: Relation<CouponDetailsModel>;
}
