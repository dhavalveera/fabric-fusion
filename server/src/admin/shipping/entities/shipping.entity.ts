import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Orders Model
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";

@Entity({ name: "deliveryDetails" })
export class DeliveryDetailsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  deliveryDetailId: string;

  @Column({ type: "varchar", length: 100 })
  courierCompany: string;

  @Column({ type: "varchar", length: 100 })
  trackingNumber: string;

  @Column({ type: "date", nullable: true })
  expectedDeliveryDate: Date;

  @Column({ type: "date", nullable: false })
  dispatchedDate: Date;

  @Column({ type: "date", nullable: true })
  deliveredDate: Date;

  @Column({ type: "varchar", length: 20, default: "Dispatched" })
  deliveryStatus: string; // e.g., Dispatched, In-Transit, Out for Delivery, Delivered

  @OneToOne(() => OrderDetailsModel, orderDetailsTable => orderDetailsTable.deliveryDetailsFk, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderDetailsFk" })
  orderDetailsFk: Relation<OrderDetailsModel>;
}
