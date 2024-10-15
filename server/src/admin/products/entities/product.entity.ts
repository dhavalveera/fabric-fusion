import { Column, Entity, OneToMany } from "typeorm";

// Common Base Model for --- createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Models
import { ProductSizeModel } from "src/admin/product-size/entities/product-size.entity";

// CONSTANTS
import { Gender } from "../constants/gender";

@Entity({ name: "productDetails" })
export class ProductsModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productDetailsId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productName: string;

  @Column({ nullable: false, type: "text" })
  productDescription: string;

  @Column({ nullable: false, type: "varchar", length: 255, default: "Fabric Fusion" })
  brandName: string;

  @Column({ nullable: false, type: "float" })
  productPrice: number;

  @Column({ nullable: true, type: "varchar", length: 255 })
  hsnCode: string;

  @Column({ nullable: false, type: "float" })
  gstPercentage: number;

  @Column({ nullable: false, type: "varchar", array: true })
  colorOptions: Array<string>;

  @Column({ nullable: false, type: "varchar", length: 255 })
  fabricType: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  styleOfFit: string;

  @Column({ nullable: false, type: "varchar", array: true })
  tags: Array<string>;

  @Column({ nullable: false, type: "enum", enum: Gender })
  gender: Gender;

  @OneToMany(() => ProductSizeModel, prodSize => prodSize.productDetailFk, { cascade: true, eager: true, nullable: false })
  sizes: ProductSizeModel[];
}
