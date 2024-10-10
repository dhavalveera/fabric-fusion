import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Product Relationship Models
import { ProductSubCategory } from "src/admin/sub-category/models/sub-category.model";
import { ProductSize } from "./product-size.model";
import { ReturnPolicy } from "./return-policy.model";
import { CareInstruction } from "./care-instructions.model";

// Constant
import { Gender } from "../constants/gender";

@Entity({ name: "productDetails" })
export class ProductDetailsModel {
  @PrimaryGeneratedColumn("uuid")
  productDetailsId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productName: string;

  @Column({ type: "text", nullable: false })
  productDescription: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  brandName: string;

  @Column({ type: "decimal", nullable: false })
  productPrice: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  hsnCode: string;

  @Column({ type: "float", nullable: true })
  gstPercentage: number;

  @Column({ type: "varchar", length: 255, array: true, nullable: false })
  colorOptions: Array<string>;

  @Column({ type: "varchar", length: 255, nullable: false })
  fabricType: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  styleOfFit: string;

  @Column({ type: "varchar", length: 255, array: true, nullable: false })
  tags: Array<string>;

  @Column({ type: "enum", enum: Gender, nullable: false })
  gender: Gender;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;

  @OneToMany(() => ProductSize, productSize => productSize.productDetailFk, { cascade: true, eager: true })
  sizes: ProductSize[];

  @OneToOne(() => ReturnPolicy, returnPolicy => returnPolicy.productDetailFk, { cascade: true, eager: true })
  @JoinColumn({ name: "returnPolicyFk" })
  returnPolicyFk: ReturnPolicy;

  @OneToOne(() => CareInstruction, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: "careInstructionFk" })
  careInstructionFk: Relation<CareInstruction>;

  @ManyToOne(() => ProductSubCategory, subCategory => subCategory.productDetailsFk, { eager: true })
  @JoinColumn({ name: "productSubCategoryFk" })
  productSubCategoryFk: ProductSubCategory;
}
