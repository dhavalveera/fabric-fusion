// import { AutoIncrement, BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

// // Product Model
// import { ProductDetailsModel } from "./product.model";

// @Table({ tableName: "returnPolicy" })
// export class ReturnPolicy extends Model {
//   @AutoIncrement
//   @Column({ type: DataType.UUIDV4, primaryKey: true, allowNull: false })
//   returnPolicyId: string;

//   @Column({ type: DataType.INTEGER, allowNull: false })
//   returnDuration: number; // Number of days allowed for return (e.g., 7)

//   @Column({ type: DataType.STRING, allowNull: false })
//   returnWindow: string; // e.g., "7 days", "30 days"

//   @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
//   conditions: Array<string>; // Conditions for return (e.g., unworn, tags attached)

//   @Column({ type: DataType.TEXT, allowNull: false })
//   policyInformation: string; // Detailed description of the return policy

//   @BelongsTo(() => ProductDetailsModel, "returnPolicyFk")
//   public productDetailFk: ReturnType<() => ProductDetailsModel>; // Link to the product this policy belongs to

//   @Column({ defaultValue: false, type: DataType.BOOLEAN })
//   isDeleted: boolean;
// }
