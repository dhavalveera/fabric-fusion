import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Relation } from "typeorm";

// Common Base Model for --- createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Models
import { ProductSizeModel } from "src/admin/product-size/entities/product-size.entity";
import { CareInstructionModel } from "src/admin/care-instruction/entities/care-instruction.entity";
import { ReturnPolicyModel } from "src/admin/return-policy/entities/return-policy.entity";
import { ProductSubCategoryModel } from "src/admin/product-sub-category/entities/product-sub-category.entity";
import { ProductImagesModel } from "src/admin/product-images/entities/product-images.entity";
import { OrderItemsModel } from "src/admin/orders/entities/order-items.entity";
import { WishlistModel } from "src/customer/wishlist/entities/wishlist.entity";
import { CartsModel } from "src/customer/cart/entities/cart.entity";
import { ProductReviewModel } from "src/customer/product-reviews/entities/product-review.entity";
import { RecentlyViewedProductsModel } from "src/customer/recently-viewed/entities/recently-viewed.entity";

// CONSTANTS
import { Gender } from "../constants/gender";

@Entity({ name: "productDetails" })
export class ProductsModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  productDetailsId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productName: string;

  @Column({ nullable: false, type: "text" })
  productDescription: string;

  @Column({ nullable: false, type: "varchar", length: 255, default: "Fabric Fusion" })
  brandName: string;

  @Column({ nullable: false, type: "float" })
  productPrice: number;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productDisplayImage: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  hsnCode: string;

  @Column({ nullable: true, type: "float" })
  gstPercentage: number;

  @Column({ nullable: false, type: "varchar", array: true })
  colorOptions: Array<string>;

  @Column({ nullable: false, type: "varchar", length: 255 })
  fabricType: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  styleOfFit: string;

  @Column({ nullable: false, type: "varchar", array: true })
  tags: Array<string>;

  @Column({ nullable: false, type: "enum", enum: Gender })
  gender: Gender;

  @Column({ nullable: false, type: "varchar", length: 170 })
  metaTitle: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  metaDescription: string;

  @Column({ nullable: false, type: "text", array: true })
  metaKeywords: Array<string>;

  @Column({ nullable: false, type: "varchar", length: 255 })
  productSlug: string;

  @OneToMany(() => ProductSizeModel, prodSize => prodSize.productDetailFk, { cascade: true, eager: true, nullable: false })
  sizes: ProductSizeModel[];

  @ManyToOne(() => ProductSubCategoryModel, subCategoryModel => subCategoryModel.productDetailsFk, { nullable: false, eager: true })
  @JoinColumn({ name: "productSubCategoryFk" })
  productSubCategoryFk: Relation<ProductSubCategoryModel>;

  @OneToOne(() => CareInstructionModel, careInstruction => careInstruction.productDetailsFk, { cascade: true, eager: true, nullable: false })
  careInstructionsFk: Relation<CareInstructionModel>;

  @OneToOne(() => ReturnPolicyModel, returnPolicyTable => returnPolicyTable.productDetailFk, { cascade: true, eager: true, nullable: false })
  returnPolicyFk: ReturnPolicyModel;

  @OneToMany(() => ProductImagesModel, productImageTable => productImageTable.productDetailsFk, { cascade: true, nullable: true, eager: true })
  productImagesFk: Relation<ProductImagesModel[]>;

  @OneToMany(() => OrderItemsModel, orderItemTable => orderItemTable.productDetailsFk, { cascade: true })
  orderItemsFk: OrderItemsModel[];

  @OneToMany(() => WishlistModel, wishlistTable => wishlistTable.productDetailsFk, { cascade: true, eager: true })
  wishlistFk: WishlistModel[];

  @OneToMany(() => CartsModel, cartsTable => cartsTable.productDetailsFk, { cascade: true })
  cartDetailsFk: CartsModel[];

  @OneToMany(() => ProductReviewModel, productReviewTable => productReviewTable.productDetailsFk)
  productReviewFk: ProductReviewModel[];

  @OneToMany(() => RecentlyViewedProductsModel, recentlyViewProdTable => recentlyViewProdTable.productDetailsFk)
  recentlyViewProdFk: RecentlyViewedProductsModel[];

  @BeforeInsert()
  createSlugFromTitle(): void {
    this.productSlug = this.metaTitle
      .toLowerCase() // Convert to lowercase
      .trim() // Trim whitespace
      .replace(/[\s]+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple hyphens with a single one
      .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
  }
}
