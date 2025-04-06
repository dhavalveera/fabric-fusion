import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Model
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";
import { WishlistModel } from "src/customer/wishlist/entities/wishlist.entity";
import { CustomerAddressModel } from "src/customer/address/entities/address.entity";
import { CartsModel } from "src/customer/cart/entities/cart.entity";
import { ProductReviewModel } from "src/customer/product-reviews/entities/product-review.entity";
import { ReviewsReportedModel } from "src/customer/product-reviews/entities/reviews-reported.entity";
import { RecentlyViewedProductsModel } from "src/customer/recently-viewed/entities/recently-viewed.entity";
import { PaymentDetailsModel } from "src/customer/payment/entities/payment.entity";
import { CouponUsageModel } from "src/admin/coupon/entities/coupon-usage.entity";
import { CustomerRegistrationsModel } from "./customer-registrations.entity";

@Entity({ name: "customerDetails" })
export class CustomerDetailsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  customerDetailsId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lastName: string;

  @Column({ type: "boolean", default: false })
  isProfileCompleted: boolean;

  @OneToOne(() => CustomerRegistrationsModel, customerRegTable => customerRegTable.customerDetailsFk, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "customerRegistrationFk" })
  customerRegistrationFk: Relation<CustomerRegistrationsModel>;

  @OneToMany(() => WishlistModel, wishlistTable => wishlistTable.customerDetailsFk)
  wishlistFk: WishlistModel[];

  @OneToMany(() => OrderDetailsModel, orderDetailsTable => orderDetailsTable.customerDetailsFk)
  orderDetailsFk: OrderDetailsModel[];

  @OneToMany(() => CustomerAddressModel, customerAddressTable => customerAddressTable.customerDetailsFk)
  customerAddressFk: Relation<CustomerAddressModel[]>;

  @OneToMany(() => CartsModel, cartsTable => cartsTable.customerDetailsFk, { cascade: true })
  cartDetailsFk: CartsModel[];

  @OneToMany(() => ProductReviewModel, productReviewTable => productReviewTable.customerDetailsFk)
  productReviewFk: ProductReviewModel[];

  @OneToMany(() => ReviewsReportedModel, reviewsReportedTable => reviewsReportedTable.reportedByUserId)
  reportedReviewsFk: ReviewsReportedModel[];

  @OneToMany(() => RecentlyViewedProductsModel, recentViewProdTable => recentViewProdTable.customerDetailsFk)
  recentlyViewedProdFk: RecentlyViewedProductsModel[];

  @OneToMany(() => PaymentDetailsModel, paymentDetailsTable => paymentDetailsTable.customerDetailsFk)
  paymentDetailsFk: PaymentDetailsModel[];

  @OneToMany(() => CouponUsageModel, couponUsageTable => couponUsageTable.customerDetailsFk)
  couponUsageFk: CouponUsageModel[];
}
