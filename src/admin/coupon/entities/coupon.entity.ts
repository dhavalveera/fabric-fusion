import { Column, Entity, OneToMany } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Model
import { PaymentDetailsModel } from "src/customer/payment/entities/payment.entity";

// Coupon Usage Model
import { CouponUsageModel } from "./coupon-usage.entity";

@Entity({ name: "couponDetails" })
export class CouponDetailsModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  couponDetailsId: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  code: string; // e.g. "SUMMER21"

  @Column({ type: "decimal", nullable: true, precision: 5, scale: 2 })
  discountPercentage: number; // for percentage-based discount

  @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
  discountAmount: number; // for fixed discount amount

  @Column({ type: "timestamp without time zone", nullable: false })
  startDate: Date;

  @Column({ type: "timestamp without time zone", nullable: false })
  expiryDate: Date;

  @Column({ type: "decimal", nullable: false, precision: 10, scale: 2 })
  minimumCartValue: number; // Minimum Cart Value to Apply the Coupon

  @Column({ type: "decimal", nullable: false, precision: 10, scale: 2 })
  maximumCartValue: number; // Maximum Cart Value to Apply the Coupon

  @Column({ type: "integer", default: 0, nullable: false })
  usageLimitPerUser: number; // How many times a user can use the Coupon

  @Column({ type: "integer", nullable: false })
  totalQuantity: number; // Total times the Coupon can be used across all Users.

  @Column({ type: "integer", nullable: false })
  remainingQuantity: number; // Remaining usage for the Coupon

  @OneToMany(() => CouponUsageModel, couponUsag => couponUsag.couponDetailsFk, { eager: true, cascade: true })
  couponUsagesFk: CouponUsageModel[]; // Track the usage of the Coupon

  @Column({ type: "boolean", nullable: false, default: false })
  isActive: boolean;

  @Column({ type: "boolean", nullable: false, default: false })
  isExpired: boolean;

  @OneToMany(() => PaymentDetailsModel, paymentDetailsTable => paymentDetailsTable.couponDetailsFk)
  paymentDetailsFk: PaymentDetailsModel[];
}
