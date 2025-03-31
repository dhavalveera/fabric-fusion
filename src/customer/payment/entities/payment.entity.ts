import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Models
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";
import { CouponDetailsModel } from "src/admin/coupon/entities/coupon.entity";
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";

@Entity({ name: "paymentDetails" })
export class PaymentDetailsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  paymentDetailsId: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  baseAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  gstAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  paymentGatewayAmount: number;

  @Column({ type: "varchar", nullable: false })
  paymentIntegrator: string;

  @Column({ type: "varchar", nullable: false, default: "Online" })
  paymentMethod: string;

  @Column({ type: "varchar", nullable: false, default: "Pending" })
  paymentStatus: string;

  @Column({ type: "varchar", nullable: true })
  paymentIntent_orderId: string;

  @Column({ type: "text", nullable: true })
  paymentResponseRecieved: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalPayableAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  storeRevenue: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  couponValue: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  deliveryCost: number;

  @Column({ type: "text", nullable: true })
  remarks: string;

  @ManyToOne(() => CustomerDetailsModel, customerDetailTable => customerDetailTable, { nullable: false })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;

  @ManyToOne(() => CouponDetailsModel, couponDetailTable => couponDetailTable, { nullable: true })
  @JoinColumn({ name: "couponDetailsFk" })
  couponDetailsFk: Relation<CouponDetailsModel>;

  @ManyToOne(() => OrderDetailsModel, orderDetailsTable => orderDetailsTable, { nullable: false })
  @JoinColumn({ name: "orderDetailsFk" })
  orderDetailsFk: Relation<OrderDetailsModel>;
}
