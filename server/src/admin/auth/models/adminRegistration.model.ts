import { AutoIncrement, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "adminRegistrations" })
export class AdminRegistrations extends Model<AdminRegistrations> {
  @AutoIncrement
  @Column({ type: DataType.UUIDV4, primaryKey: true, allowNull: false })
  adminRegistrationId: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;
}
