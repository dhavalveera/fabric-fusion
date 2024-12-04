import { Module } from "@nestjs/common";

// TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ProductReviewsService } from "./product-reviews.service";
import { ProductReviewsController } from "./product-reviews.controller";

// Model
import { ProductReviewModel } from "./entities/product-review.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductReviewModel])],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService],
  exports: [TypeOrmModule],
})
export class ProductReviewsModule {}
