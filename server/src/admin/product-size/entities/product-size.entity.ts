import { Column, Entity } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// CONSTANTS
import { Size } from "../constants/size";

@Entity({ name: "productSize" })
export class ProductSizeModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productSizeId: string;

  @Column({ nullable: false, type: "enum", enum: Size })
  size: Size;

  @Column({ nullable: false, type: "integer" })
  totalStock: number;

  @Column({ nullable: false, type: "integer" })
  stockRemaining: number;
}
