import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

// Category Model
import { ProductCategory } from "src/admin/category/models/category.model";

// Product Details Model
// import { ProductDetailsModel } from "src/admin/products/models/product.model";

@Table({ tableName: "productSubCategory", timestamps: true, createdAt: true, updatedAt: true })
export class ProductSubCategory extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ autoIncrement: true, type: DataType.UUIDV4, primaryKey: true, allowNull: false })
  declare productSubCategoryId: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare productSubCategoryName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare productSubCategoryImage: string;

  @ForeignKey(() => ProductCategory)
  @Column
  declare productCategoryFk: string;

  @BelongsTo(() => ProductCategory)
  declare productCategory: ProductCategory;

  // @HasMany(() => ProductDetailsModel)
  // @Column({ allowNull: false, type: DataType.UUIDV4 })
  // productDetailsFk: ProductDetailsModel;

  @Column({ defaultValue: false, type: DataType.BOOLEAN })
  declare isDeleted: boolean;
}
