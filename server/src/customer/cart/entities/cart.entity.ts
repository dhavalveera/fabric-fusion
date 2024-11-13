import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Model
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";

// CONSTANTS
import { CartStatus } from "../constants";

@Entity({ name: "cartDetails" })
export class CartsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  cartDetailsId: string;

  @Column({ type: "enum", enum: CartStatus, default: "Active" })
  cartStatus: CartStatus;

  @Column({ type: "integer", nullable: false })
  productQuantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  perProductPrice: number;

  @Column({ type: "timestamp without time zone", nullable: false })
  addedAt: Date;

  @Column({ type: "timestamp without time zone", nullable: true })
  lastModifiedAt: Date;

  @ManyToOne(() => ProductsModel, productsTable => productsTable.cartDetailsFk, { nullable: false })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;

  @ManyToOne(() => OrderDetailsModel, orderDetailsTable => orderDetailsTable.cartDetailsFk, { nullable: true })
  @JoinColumn({ name: "orderDetailsFk" })
  orderDetailsFk: Relation<OrderDetailsModel>;

  @ManyToOne(() => CustomerDetailsModel, customerDetailsTable => customerDetailsTable.cartDetailsFk, { nullable: false })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;
}
