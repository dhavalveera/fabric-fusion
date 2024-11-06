import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export function CommonColumns() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    Column({ nullable: false, type: "boolean", default: false })(constructor.prototype, "isDeleted");
    CreateDateColumn()(constructor.prototype, "createdAt");
    UpdateDateColumn()(constructor.prototype, "updatedAt");
  };
}
