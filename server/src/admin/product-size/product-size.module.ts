import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductSizeModel } from "./entities/product-size.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductSizeModel])],
  exports: [TypeOrmModule],
})
export class ProductSizeModule {}
