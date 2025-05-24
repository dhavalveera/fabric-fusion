import { Controller, Get } from "@nestjs/common";

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
  findAll() {
    return this.productReviewsService.findAll();
  }
}
