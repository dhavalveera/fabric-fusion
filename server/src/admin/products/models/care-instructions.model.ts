// import { AutoIncrement, BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

// // Product Model
// import { ProductDetailsModel } from "./product.model";

// @Table({ tableName: "careInstruction" })
// export class CareInstruction extends Model {
//   @AutoIncrement
//   @Column({ type: DataType.UUIDV4, primaryKey: true, allowNull: false })
//   careInstructionId: string;

//   @Column({ type: DataType.STRING, allowNull: true })
//   washingInstructions: string; // E.g., "Machine wash cold, gentle cycle."

//   @Column({ type: DataType.STRING, allowNull: true })
//   dryingInstructions: string; // E.g., "Tumble dry low or hang to dry."

//   @Column({ type: DataType.STRING, allowNull: true })
//   ironingInstructions: string; // E.g., "Iron on low heat, inside out."

//   @Column({ type: DataType.STRING, allowNull: true })
//   bleachingInstructions: string; // E.g., "Do not bleach."

//   @Column({ type: DataType.STRING, allowNull: true })
//   dryCleaningInstructions: string; // E.g., "Dry clean only."

//   @Column({ type: DataType.STRING, allowNull: true })
//   storageInstructions: string; // E.g., "Store flat to maintain shape."

//   @BelongsTo(() => ProductDetailsModel, "careInstructionFk")
//   public productDetailFk: ReturnType<() => ProductDetailsModel>;

//   @Column({ defaultValue: false, type: DataType.BOOLEAN })
//   isDeleted: boolean;
// }
