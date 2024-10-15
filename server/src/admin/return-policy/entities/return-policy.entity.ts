import { Column, Entity } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

@Entity({ name: "returnPolicy" })
export class ReturnPolicyModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  returnPolicyId: string;

  @Column({ nullable: false, type: "integer" })
  returnDuration: number;

  @Column({ nullable: false, type: "varchar", length: 255 })
  returnWindow: string;

  @Column({ nullable: false, type: "varchar", array: true })
  conditions: Array<string>;

  @Column({ nullable: false, type: "text" })
  policyInformation: string;
}
