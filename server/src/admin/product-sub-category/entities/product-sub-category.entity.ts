import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, Relation, UpdateDateColumn } from "typeorm";

// Models
import { ProductCategoryModel } from "src/admin/product-category/entities/product-category.entity";
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { ProductAttributeModel } from "src/admin/product-attributes/entities/product-attribute.entity";

@Entity({ name: "productSubCategory" })
export class ProductSubCategoryModel {
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

  @Column({ nullable: false, type: "boolean", default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
