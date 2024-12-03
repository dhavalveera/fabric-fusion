import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

// Common base Model
import { BaseCommonModel } from "src/common/common-column.entity";

// Customer Registration Model
import { CustomerRegistrationsModel } from "./customer-registrations.entity";

@Entity({ name: "passwordResetToken" })
export class PasswordResetTokenModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  passwordResetTokenId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  token: string;

  @Column({ type: "timestamp without time zone", nullable: false })
  tokenExpiry: Date;

  @Column({ type: "boolean", default: false })
  isPasswordResetted: boolean;

  @ManyToOne(() => CustomerRegistrationsModel, customerRegTable => customerRegTable, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customerRegistrationFk" })
  customerRegistrationFk: Relation<CustomerRegistrationsModel>;
}
