import { Module } from "@nestjs/common";

// TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ProductCategoryService } from "./product-category.service";
import { ProductCategoryController } from "./product-category.controller";

// Model
import { ProductCategoryModel } from "./entities/product-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryModel])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
  exports: [TypeOrmModule],
})
export class ProductCategoryModule {}
