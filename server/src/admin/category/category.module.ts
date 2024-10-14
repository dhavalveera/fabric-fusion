import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

// Model
import { ProductCategory } from "./models/category.model";

import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { ProductSubCategory } from "../sub-category/models/sub-category.model";

@Module({
  imports: [SequelizeModule.forFeature([ProductCategory, ProductSubCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
