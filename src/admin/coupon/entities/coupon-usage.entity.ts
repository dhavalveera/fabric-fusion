import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";

// Common Base Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Models
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";
import { CouponDetailsModel } from "./coupon.entity";

@Entity({ name: "couponUsage" })
export class CouponUsageModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  couponUsageId: string;

  @Column({ type: "integer", default: 1 })
  usageCount: number; // Number of times a user has used this coupon.

  @ManyToOne(() => CouponDetailsModel, coupon => coupon.couponUsagesFk, { onDelete: "CASCADE" })
  @JoinColumn({ name: "couponDetailsId" })
  couponDetailsFk: Relation<CouponDetailsModel>;

  @ManyToOne(() => CustomerDetailsModel, customerDetailsTable => customerDetailsTable.couponUsageFk, { nullable: false })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;
}
