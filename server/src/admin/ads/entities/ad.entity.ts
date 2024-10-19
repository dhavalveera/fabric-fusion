import { Column, Entity } from "typeorm";

// Base Common Model
import { BaseCommonModel } from "src/common/common-column.entity";

@Entity({ name: "ads" })
export class AdsModel extends BaseCommonModel {
  @Column({ generated: "uuid", nullable: false, primary: true, type: "uuid", unique: true })
  adsId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  adsImageUrl: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  imgTitle: string;

  @Column({ type: "boolean", nullable: false, default: true })
  isActive: boolean;
}
