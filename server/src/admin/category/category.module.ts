import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Model
import { ProductCategory } from "./models/category.model";

import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
