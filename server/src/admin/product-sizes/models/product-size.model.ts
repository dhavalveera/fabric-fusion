// import { AutoIncrement, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

// // Product Model
// import { ProductDetailsModel } from "src/admin/products/models/product.model";

// // Size Constant/Enum
// import { Size } from "../constants/size";

// @Table({ tableName: "productSize" })
// export class ProductSize extends Model {
//   @AutoIncrement
//   @Column({ type: DataType.UUIDV4, primaryKey: true, allowNull: false })
//   productSizeId: string;

//   @Column({ type: DataType.ENUM(...Object.values(Size)), allowNull: false })
//   size: Size;

//   @Column({ type: DataType.INTEGER, allowNull: false })
//   totalStock: number;

//   @Column({ type: DataType.INTEGER, allowNull: false })
//   stockRemaining: number;

//   @HasMany(() => ProductDetailsModel, "productDetailFk")
//   public productDetailFk: ReturnType<() => ProductDetailsModel>; // Many Sizes belong to one product

//   @Column({ defaultValue: false, type: DataType.BOOLEAN })
//   isDeleted: boolean;
// }
