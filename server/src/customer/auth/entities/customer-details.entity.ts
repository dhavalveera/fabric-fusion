import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Model
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";
import { WishlistModel } from "src/customer/wishlist/entities/wishlist.entity";
import { CustomerAddressModel } from "src/customer/address/entities/address.entity";
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
}
