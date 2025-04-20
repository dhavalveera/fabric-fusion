// TypeORM
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// ENUM
import { StaticPageType } from "../constants";

@Entity({ name: "staticPages" })
export class StaticPageModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  staticPageId: string;

  @Column({ type: "enum", enum: StaticPageType, nullable: false })
  pageType: StaticPageType;

  @Column({ type: "varchar", length: 80, nullable: false })
  pageMetaTitle: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  pageMetaDescription: string;

  @Column({ type: "text", nullable: false })
  pageContent: string;
}
