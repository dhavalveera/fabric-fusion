import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Model
import { ProductSize } from "./models/product-size.model";

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize])],
})
export class ProductSizesModule {}
