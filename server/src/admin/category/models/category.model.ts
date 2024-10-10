import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Product Sub Category Model
import { ProductSubCategory } from "src/admin/sub-category/models/sub-category.model";

@Entity({ name: "productCategory" })
export class ProductCategory {
  @PrimaryGeneratedColumn("uuid")
  productCategoryId: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  productCategoryName: string;

  @OneToMany(() => ProductSubCategory, subCategory => subCategory.productCategoryFk, { cascade: true })
  productSubCategoryFk: ProductSubCategory[];

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;
}
