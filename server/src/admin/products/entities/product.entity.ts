import { Column, Entity, OneToMany, OneToOne, Relation } from "typeorm";

// Common Base Model for --- createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Models
import { ProductSizeModel } from "src/admin/product-size/entities/product-size.entity";
import { CareInstructionModel } from "src/admin/care-instruction/entities/care-instruction.entity";
import { ReturnPolicyModel } from "src/admin/return-policy/entities/return-policy.entity";

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

  @Column({ nullable: false, type: "varchar", length: 255 })
  productDisplayImage: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  hsnCode: string;

  @Column({ nullable: true, type: "float" })
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

  @OneToOne(() => CareInstructionModel, careInstruction => careInstruction.productDetailsFk, { cascade: true, eager: true, nullable: false })
  careInstructionsFk: Relation<CareInstructionModel>;

  @OneToOne(() => ReturnPolicyModel, returnPolicyTable => returnPolicyTable.productDetailFk, { cascade: true, eager: true, nullable: false })
  returnPolicyFk: ReturnPolicyModel;
}
