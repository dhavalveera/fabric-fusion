import { Column, Entity, OneToMany } from "typeorm";

// Common Base Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Sub Category Model
import { ProductSubCategoryModel } from "src/admin/product-sub-category/entities/product-sub-category.entity";

@Entity({ name: "productCategory" })
export class ProductCategoryModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productCategoryId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productCategoryName: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productCategoryImage: string;

  @OneToMany(() => ProductSubCategoryModel, subCategoryTable => subCategoryTable.productCategoryFk, { cascade: true })
  productSubCategories: ProductSubCategoryModel[];
}
