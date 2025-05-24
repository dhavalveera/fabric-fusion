import { Controller, Get, Query } from "@nestjs/common";

// Swagger
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Service
import { ProductReviewsService } from "./product-reviews.service";

@ApiTags("Product Reviews")
@ApiBearerAuth()
@Controller("admin/product-reviews")
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Get("all")
  findAll(@Query("pageSize") pageSize: string, @Query("pageNumber") pageNumber: string) {
    return this.productReviewsService.findAll(pageSize, pageNumber);
  }
}
