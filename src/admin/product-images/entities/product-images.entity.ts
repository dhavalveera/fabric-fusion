import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";

// Common base Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Model
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Entity({ name: "productImages" })
export class ProductImagesModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productImageId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  productImageUrl: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  imageAltText: string;

  @ManyToOne(() => ProductsModel, productTable => productTable.productImagesFk, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;
}
