import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

// Models
import { CareInstruction } from "./models/care-instructions.model";
import { ProductDetailsModel } from "./models/product.model";
import { ReturnPolicy } from "./models/return-policy.model";

import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductSizesModule } from "../product-sizes/product-sizes.module";
import { SubCategoryModule } from "../sub-category/sub-category.module";

@Module({
  imports: [SequelizeModule.forFeature([CareInstruction, ProductDetailsModel, ReturnPolicy]), ProductSizesModule, SubCategoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
