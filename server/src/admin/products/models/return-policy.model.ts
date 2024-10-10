import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Product Model
import { ProductDetailsModel } from "./product.model";

@Entity({ name: "returnPolicy" })
export class ReturnPolicy {
  @PrimaryGeneratedColumn("uuid")
  returnPolicyId: string;

  @Column({ type: "int", nullable: false })
  returnDuration: number; // Number of days allowed for return (e.g., 7)

  @Column({ type: "varchar", length: 255, nullable: false })
  returnWindow: string; // e.g., "7 days", "30 days"

  @Column({ type: "text", array: true, nullable: false })
  conditions: Array<string>; // Conditions for return (e.g., unworn, tags attached)

  @Column({ type: "text", nullable: false })
  policyInformation: string; // Detailed description of the return policy

  @OneToOne(() => ProductDetailsModel, productTable => productTable.returnPolicyFk, { onDelete: "CASCADE" })
  productDetailFk: Relation<ProductDetailsModel>; // Link to the product this policy belongs to

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;
}
