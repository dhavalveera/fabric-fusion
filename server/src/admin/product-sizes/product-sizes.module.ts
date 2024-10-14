import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

// Model
import { ProductSize } from "./models/product-size.model";

@Module({
  imports: [SequelizeModule.forFeature([ProductSize])],
  exports: [SequelizeModule],
})
export class ProductSizesModule {}
