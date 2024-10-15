import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

// Sub Category Model
import { ProductSubCategoryModel } from "src/admin/product-sub-category/entities/product-sub-category.entity";

@Entity({ name: "productCategory" })
export class ProductCategoryModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productCategoryId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productCategoryName: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productCategoryImage: string;

  @OneToMany(() => ProductSubCategoryModel, subCategoryTable => subCategoryTable.productCategoryFk, { cascade: true })
  productSubCategories: ProductSubCategoryModel[];

  @Column({ nullable: false, type: "boolean", default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
