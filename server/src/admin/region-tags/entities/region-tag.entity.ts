import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Base Common Model for createdAt, updatedAt, isDeleted
import { BaseCommonModel } from "src/common/common-column.entity";

// Relationship Entity
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Entity({ name: "productRegionTags" })
export class RegionTagModel extends BaseCommonModel {
  @PrimaryGeneratedColumn("uuid")
  productRegionTagId: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  regionTagName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  regionTagDescription: string;

  @OneToMany(() => ProductsModel, productsTable => productsTable.regionTagsFk)
  productDetailsFk: ProductsModel[];
}
