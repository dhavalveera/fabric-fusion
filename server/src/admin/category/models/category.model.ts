import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

// Product Sub Category Model
import { ProductSubCategory } from "src/admin/sub-category/models/sub-category.model";

@Table({ tableName: "productCategory", timestamps: true, createdAt: true, updatedAt: true })
export class ProductCategory extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ autoIncrement: true, type: DataType.UUIDV4, primaryKey: true, allowNull: false })
  declare productCategoryId: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare productCategoryName: string;

  @HasMany(() => ProductSubCategory)
  declare subCategories: ProductSubCategory[];

  @Column({ defaultValue: false, type: DataType.BOOLEAN })
  declare isDeleted: boolean;
}
