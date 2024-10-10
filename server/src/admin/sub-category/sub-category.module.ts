import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Model
import { ProductSubCategory as ProductSubCategoryModel } from "./models/sub-category.model";

import { SubCategoryService } from "./sub-category.service";
import { SubCategoryController } from "./sub-category.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProductSubCategoryModel])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
