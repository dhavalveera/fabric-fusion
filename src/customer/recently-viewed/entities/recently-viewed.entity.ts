import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Table
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Entity({ name: "recentlyViewedProducts" })
export class RecentlyViewedProductsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  recentlyViewedProductId: string;

  @CreateDateColumn()
  viewedAt: Date;

  @ManyToOne(() => CustomerDetailsModel, customerDetailsTable => customerDetailsTable, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;

  @ManyToOne(() => ProductsModel, productsTable => productsTable, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;
}
