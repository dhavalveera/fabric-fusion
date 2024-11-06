import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";

// Common Model
import { BaseCommonModel } from "src/common/common-column.entity";

// Models
import { ProductCategoryModel } from "src/admin/product-category/entities/product-category.entity";
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { ProductAttributeModel } from "src/admin/product-attributes/entities/product-attribute.entity";

@Entity({ name: "productSubCategory" })
export class ProductSubCategoryModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productSubCategoryId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productSubCategoryName: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productSubCategoryImage: string;

  @ManyToOne(() => ProductCategoryModel, categoryTable => categoryTable.productSubCategories, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "productCategoryFk" })
  productCategoryFk: Relation<ProductCategoryModel>;

  @OneToMany(() => ProductsModel, productTable => productTable.productSubCategoryFk, { cascade: true, nullable: false })
  productDetailsFk: Relation<ProductsModel[]>;

  @OneToMany(() => ProductAttributeModel, productAttributeTable => productAttributeTable.productSubCategoryFk, { cascade: true })
  productAttributes: ProductAttributeModel[];
}
