import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Product Model
import { ProductDetailsModel } from "./product.model";

@Entity({ name: "careInstruction" })
export class CareInstruction {
  @PrimaryGeneratedColumn("uuid")
  careInstructionId: string;

  @Column({ type: "varchar", length: 255 })
  washingInstructions: string; // E.g., "Machine wash cold, gentle cycle."

  @Column({ type: "varchar", length: 255 })
  dryingInstructions: string; // E.g., "Tumble dry low or hang to dry."

  @Column({ type: "varchar", length: 255 })
  ironingInstructions: string; // E.g., "Iron on low heat, inside out."

  @Column({ type: "varchar", length: 255 })
  bleachingInstructions: string; // E.g., "Do not bleach."

  @Column({ type: "varchar", length: 255 })
  dryCleaningInstructions: string; // E.g., "Dry clean only."

  @Column({ type: "varchar", length: 255 })
  storageInstructions: string; // E.g., "Store flat to maintain shape."

  @OneToOne(() => ProductDetailsModel, productTable => productTable.careInstructionFk, { onDelete: "CASCADE", nullable: true })
  productDetailId: Relation<ProductDetailsModel>;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;
}
