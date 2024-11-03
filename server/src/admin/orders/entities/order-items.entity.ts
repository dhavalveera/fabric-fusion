import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Models
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { OrderDetailsModel } from "./order.entity";

@Entity({ name: "orderItems" })
export class OrderItemsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  orderItemId: string;

  @Column({ type: "integer", nullable: false })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  perQuantityPrice: number; // Price of a single item at the time of the Order

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalAmount: number; // Quantity * Price

  @ManyToOne(() => OrderDetailsModel, orderDetailsTable => orderDetailsTable.orderItemsFk, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "orderDetailsFk" })
  orderDetailsFk: Relation<OrderDetailsModel>;

  @ManyToOne(() => ProductsModel, productDetailsTable => productDetailsTable.orderItemsFk, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;
}
