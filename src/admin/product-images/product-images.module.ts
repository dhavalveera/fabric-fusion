import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ProductImagesController } from "./product-images.controller";
import { ProductImagesService } from "./product-images.service";

// Model
import { ProductImagesModel } from "./entities/product-images.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductImagesModel])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [TypeOrmModule],
})
export class ProductImagesModule {}
