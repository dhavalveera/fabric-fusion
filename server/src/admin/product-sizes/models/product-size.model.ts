import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Product Model
import { ProductDetailsModel } from "src/admin/products/models/product.model";

// Size Constant/Enum
import { Size } from "../constants/size";

@Entity({ name: "productSize" })
export class ProductSize {
  @PrimaryGeneratedColumn("uuid")
  productSizeId: string;

  @Column({ type: "enum", enum: Size, nullable: false })
  size: Size;

  @Column({ type: "int", nullable: false })
  totalStock: number;

  @Column({ type: "int", nullable: false })
  stockRemaining: number;

  @ManyToOne(() => ProductDetailsModel, productTable => productTable.sizes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productDetailFk" })
  productDetailFk: Relation<ProductDetailsModel>; // Many Sizes belong to one product

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;
}
