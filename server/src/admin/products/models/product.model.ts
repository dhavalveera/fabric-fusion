// import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";

// // Product Relationship Models
// import { ProductSubCategory } from "src/admin/sub-category/models/sub-category.model";
// import { ProductSize } from "src/admin/product-sizes/models/product-size.model";
// import { ReturnPolicy } from "./return-policy.model";
// import { CareInstruction } from "./care-instructions.model";

// // Constant
// import { Gender } from "../constants/gender";

// @Table({ tableName: "productDetails" })
// export class ProductDetailsModel extends Model {
//   @AutoIncrement
//   @Column({ type: DataType.UUIDV4, primaryKey: true, allowNull: false })
//   productDetailsId: string;

//   @Column({ allowNull: false, type: DataType.STRING })
//   productName: string;

//   @Column({ type: DataType.TEXT, allowNull: false })
//   productDescription: string;

//   @Column({ type: DataType.STRING, allowNull: false, defaultValue: "Fabric Fusion" })
//   brandName: string;

//   @Column({ type: DataType.FLOAT, allowNull: false })
//   productPrice: number;

//   @Column({ type: DataType.STRING, allowNull: true })
//   hsnCode: string;

//   @Column({ type: DataType.FLOAT, allowNull: true })
//   gstPercentage: number;

//   @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
//   colorOptions: Array<string>;

//   @Column({ type: DataType.STRING, allowNull: false })
//   fabricType: string;

//   @Column({ type: DataType.STRING, allowNull: false })
//   styleOfFit: string;

//   @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
//   tags: Array<string>;

//   @Column({ type: DataType.ENUM(...Object.values(Gender)), allowNull: false })
//   gender: Gender;

//   @Column({ defaultValue: false, type: DataType.BOOLEAN })
//   isDeleted: boolean;

//   @BelongsTo(() => ProductSize, "productDetailFk")
//   sizes: ProductSize[];

//   @HasOne(() => ReturnPolicy, "returnPolicyFk")
//   returnPolicyFk: ReturnPolicy;

//   @HasOne(() => CareInstruction, "careInstructionFk")
//   careInstructionFk: CareInstruction;

//   @ForeignKey(() => ProductSubCategory)
//   @BelongsTo(() => ProductSubCategory)
//   @Column({ allowNull: false, type: DataType.UUIDV4, field: "productSubCategoryFk" })
//   public productSubCategoryFk: ReturnType<() => ProductSubCategory>;
// }
