import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Entities
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Entity({ name: "productReviews" })
export class ProductReviewModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  productReviewsId: string;

  @Column({ type: "integer", nullable: false })
  ratingStar: number;

  @Column({ type: "text", nullable: false })
  ratingComment: string;

  @ManyToOne(() => ProductsModel, productsTable => productsTable, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;

  @ManyToOne(() => CustomerDetailsModel, customerDetailsTable => customerDetailsTable, { nullable: false })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;
}
