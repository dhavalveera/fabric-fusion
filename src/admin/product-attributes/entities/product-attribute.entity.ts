import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Columns
import { ProductSubCategoryModel } from "src/admin/product-sub-category/entities/product-sub-category.entity";

@Entity({ name: "productAttribute" })
export class ProductAttributeModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productAttributeId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productAttributeName: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productAttributeValue: string;

  @ManyToOne(() => ProductSubCategoryModel, productSubCategTable => productSubCategTable.productAttributes, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "productSubCategoryFk" })
  productSubCategoryFk: Relation<ProductSubCategoryModel>;
}
