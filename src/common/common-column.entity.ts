import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseCommonModel {
  @Column({ nullable: false, type: "boolean", default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
