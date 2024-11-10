import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// ENUM
import { AddressTypeEnum } from "../constant";

// Relationship Table
import { CustomerDetailsModel } from "src/customer/auth/entities/customer-details.entity";

@Entity({ name: "customerAddress" })
export class CustomerAddressModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  customerAddressId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 12, nullable: false })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  address: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  city: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  state: string;

  @Column({ type: "integer", nullable: false })
  pinCode: number;

  @Column({ type: "enum", enum: AddressTypeEnum, nullable: false })
  addressType: AddressTypeEnum;

  @Column({ type: "boolean", nullable: false, default: false })
  isPrimaryAddress: boolean;

  @ManyToOne(() => CustomerDetailsModel, customerDetailTable => customerDetailTable.customerAddressFk, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customerDetailsFk" })
  customerDetailsFk: Relation<CustomerDetailsModel>;
}
