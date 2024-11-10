import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// bcrypt
import { hashSync } from "bcryptjs";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Model
import { CustomerDetailsModel } from "./customer-details.entity";

@Entity({ name: "customerRegistrations" })
export class CustomerRegistrationsModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  customerRegistrationId: string;

  @Column({ type: "varchar", length: 12, nullable: true, unique: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  emailAddress: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @Column({ type: "integer", nullable: true })
  otpCode: number;

  @Column({ type: "boolean", default: false })
  isEmailVerified: boolean;

  @OneToOne(() => CustomerDetailsModel, customerDetailTable => customerDetailTable.customerRegistrationFk, { cascade: true })
  customerDetailsFk: Relation<CustomerDetailsModel>;

  @BeforeInsert()
  hashThePassword(): void {
    this.password = hashSync(this.password, 10);
  }
}
