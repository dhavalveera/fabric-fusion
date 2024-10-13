import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Models
import { CareInstruction } from "./models/care-instructions.model";
import { ProductDetailsModel } from "./models/product.model";
import { ReturnPolicy } from "./models/return-policy.model";

import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CareInstruction, ProductDetailsModel, ReturnPolicy])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
