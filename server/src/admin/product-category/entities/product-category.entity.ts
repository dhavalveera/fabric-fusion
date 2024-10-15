import { Column, Entity } from "typeorm";

// Common Model => createdAt + updatedAt
import { BaseCommonModel } from "src/common/common-column.entity";

@Entity({ name: "productCategory" })
export class ProductCategoryModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productCategoryId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productCategoryName: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productCategoryImage: string;
}
