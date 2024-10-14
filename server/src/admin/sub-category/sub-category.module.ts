import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

// Model
import { ProductSubCategory as ProductSubCategoryModel } from "./models/sub-category.model";

import { SubCategoryService } from "./sub-category.service";
import { SubCategoryController } from "./sub-category.controller";
import { ProductCategory } from "../category/models/category.model";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [CategoryModule, SequelizeModule.forFeature([ProductCategory, ProductSubCategoryModel])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
