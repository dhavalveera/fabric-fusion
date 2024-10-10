import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Category Model
import { ProductCategory } from "src/admin/category/models/category.model";

// Product Details Model
import { ProductDetailsModel } from "src/admin/products/models/product.model";

@Entity({ name: "productSubCategory" })
export class ProductSubCategory {
  @PrimaryGeneratedColumn("uuid")
  productSubCategoryId: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  productSubCategoryName: string;

  @ManyToOne(() => ProductCategory, productCategory => productCategory.productCategoryId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productCategoryFk" })
  productCategoryFk: ProductCategory;

  @OneToMany(() => ProductDetailsModel, productTable => productTable.productSubCategoryFk)
  productDetailsFk: ProductDetailsModel[];

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;
}
