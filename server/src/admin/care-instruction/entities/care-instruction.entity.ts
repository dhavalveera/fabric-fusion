import { Column, Entity, JoinColumn, OneToOne, Relation } from "typeorm";

// Product Details Model
import { ProductsModel } from "src/admin/products/entities/product.entity";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

@Entity({ name: "careInstruction" })
export class CareInstructionModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  careInstructionId: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  washingInstructions: string; // E.g., "Machine wash cold, gentle cycle."

  @Column({ nullable: true, type: "varchar", length: 255 })
  dryingInstructions: string; // E.g., "Tumble dry low or hang to dry."

  @Column({ nullable: true, type: "varchar", length: 255 })
  ironingInstructions: string; // E.g., "Iron on low heat, inside out."

  @Column({ nullable: true, type: "varchar", length: 255 })
  bleachingInstructions: string; // E.g., "Do not bleach."

  @Column({ nullable: true, type: "varchar", length: 255 })
  dryCleaningInstructions: string; // E.g., "Dry clean only."

  @Column({ nullable: true, type: "varchar", length: 255 })
  storageInstructions: string; // E.g., "Store flat to maintain shape."

  @OneToOne(() => ProductsModel, productTable => productTable.careInstructionsFk, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;
}
