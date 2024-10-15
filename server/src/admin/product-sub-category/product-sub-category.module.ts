import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ProductSubCategoryService } from "./product-sub-category.service";
import { ProductSubCategoryController } from "./product-sub-category.controller";

// Model
import { ProductSubCategoryModel } from "./entities/product-sub-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductSubCategoryModel])],
  controllers: [ProductSubCategoryController],
  providers: [ProductSubCategoryService],
  exports: [TypeOrmModule],
})
export class ProductSubCategoryModule {}
