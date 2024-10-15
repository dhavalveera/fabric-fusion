import { Column, Entity } from "typeorm";

// Class Transfomer
import { Exclude } from "class-transformer";

// Common Model => createdAt + updatedAt
import { BaseCommonModel } from "src/common/common-column.entity";

@Entity({ name: "adminRegistrations" })
export class AuthModel extends BaseCommonModel {
  // @PrimaryGeneratedColumn("uuid")
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  adminRegistrationId: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  name: string;

  @Column({ nullable: false, type: "varchar", length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false, type: "varchar", length: 255 })
  password: string;

  @Column({ nullable: false, type: "boolean", default: true })
  isActive: boolean;
}
