import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Models
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";
import { ProductReviewModel } from "./product-review.entity";

@Entity({ name: "reviewsReported" })
export class ReviewsReportedModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  reviewsReportedId: string;

  @Column({ type: "text", nullable: false })
  reason: string;

  @Column({ type: "enum", enum: ["Pending", "Reviewed", "Action Taken"], default: "Pending" })
  reportStatus: "Pending" | "Reviewed" | "Action Taken";

  @ManyToOne(() => CustomerDetailsModel, customerDetailTable => customerDetailTable, { onDelete: "SET NULL" })
  @JoinColumn({ name: "reportedByUserId" })
  reportedByUserId: Relation<CustomerDetailsModel>;

  @ManyToOne(() => ProductReviewModel, productReviewTable => productReviewTable, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productReviewFk" })
  productReviewFk: Relation<ProductReviewModel>;
}
