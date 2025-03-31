import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Models
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";

@Entity({ name: "wishlist" })
export class WishlistModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  wishlistId: string;

  @ManyToOne(() => ProductsModel, productsTable => productsTable.wishlistFk, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "productDetailsFk" })
  productDetailsFk: Relation<ProductsModel>;

  @CreateDateColumn({ nullable: false })
  addedOn: Date;

  @Column({ type: "date", nullable: true })
  removedOn: Date;

  @ManyToOne(() => CustomerDetailsModel, customerDetailTable => customerDetailTable, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;
}
