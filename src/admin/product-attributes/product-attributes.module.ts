import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ProductAttributesService } from "./product-attributes.service";
import { ProductAttributesController } from "./product-attributes.controller";

// Model
import { ProductAttributeModel } from "./entities/product-attribute.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeModel])],
  controllers: [ProductAttributesController],
  providers: [ProductAttributesService],
  exports: [TypeOrmModule],
})
export class ProductAttributesModule {}
