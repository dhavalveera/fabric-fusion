import { Column, Entity, JoinColumn, OneToOne, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Product Details Model
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Entity({ name: "returnPolicy" })
export class ReturnPolicyModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  returnPolicyId: string;

  @Column({ nullable: false, type: "integer" })
  returnDuration: number;

  @Column({ nullable: false, type: "varchar", length: 255 })
  returnWindow: string;

  @Column({ nullable: false, type: "varchar", array: true })
  conditions: Array<string>;

  @Column({ nullable: false, type: "text" })
  policyInformation: string;

  @OneToOne(() => ProductsModel, productTable => productTable.returnPolicyFk, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productDetailFk" })
  productDetailFk: Relation<ProductsModel>;
}
