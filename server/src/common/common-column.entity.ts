import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseCommonModel {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
