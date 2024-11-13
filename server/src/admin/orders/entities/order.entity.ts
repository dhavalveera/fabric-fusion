import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Relation } from "typeorm";

// Common Base Model for createdAt, updatedAt & isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Models
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";
import { DeliveryDetailsModel } from "src/admin/shipping/entities/shipping.entity";
import { CartsModel } from "src/customer/cart/entities/cart.entity";
import { OrderItemsModel } from "./order-items.entity";

@Entity({ name: "orderDetails" })
export class OrderDetailsModel extends BaseCommonModel {
  @Column({ nullable: false, primary: true, type: "varchar", unique: true })
  orderDetailId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discountAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: "varchar", length: 20, default: "pending" })
  orderStatus: string; // e.g. Pending, Processing, Shipped, Cancelled or Completed

  @CreateDateColumn()
  orderDate: Date;

  @OneToMany(() => OrderItemsModel, orderItemsTable => orderItemsTable.orderDetailsFk, { cascade: true, eager: true })
  orderItemsFk: OrderItemsModel[];

  @OneToOne(() => DeliveryDetailsModel, deliveryDetailTable => deliveryDetailTable.orderDetailsFk, { cascade: true, eager: true })
  @JoinColumn({ name: "deliveryDetailsFk" })
  deliveryDetailsFk: DeliveryDetailsModel;

  @ManyToOne(() => CustomerDetailsModel, customerDetailTable => customerDetailTable, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;

  @OneToMany(() => CartsModel, cartsTable => cartsTable.orderDetailsFk, { cascade: true })
  cartDetailsFk: CartsModel[];

  @BeforeInsert()
  generateOrderId(): void {
    const now = new Date();

    // Format the timestamp as YYYYMMDDHHMMSS
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

    // Generate a random 4-digit number or use an incrementing counter
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString(); // random 4-digit number

    this.orderDetailId = `ORD-${timestamp}-${randomSuffix}`;
  }
}
