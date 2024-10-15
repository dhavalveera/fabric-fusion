import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

// Model
import { ProductsModel } from "./entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductsModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
