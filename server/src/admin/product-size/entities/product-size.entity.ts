import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Products Model
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { CartsModel } from "src/customer/cart/entities/cart.entity";

// CONSTANTS
import { Size } from "../constants/size";

@Entity({ name: "productSize" })
export class ProductSizeModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productSizeId: string;

  @Column({ nullable: false, type: "enum", enum: Size })
  size: Size;

  @Column({ nullable: false, type: "integer" })
  totalStock: number;

  @Column({ nullable: false, type: "integer" })
  stockRemaining: number;

  @ManyToOne(() => ProductsModel, productTable => productTable.sizes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productDetailFk" })
  productDetailFk: Relation<ProductsModel>;

  @OneToMany(() => CartsModel, cartsTable => cartsTable, { nullable: false })
  cartDetailsFk: CartsModel[];
}
