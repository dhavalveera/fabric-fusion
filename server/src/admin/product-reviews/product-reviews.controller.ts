import { Controller, Get, Body, Patch, Param, Query } from "@nestjs/common";

// Swagger
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Service
import { ProductReviewsService } from "./product-reviews.service";

// DTO
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";

// Types
import { StatusType } from "./types";

@ApiTags("Product Reviews")
@ApiBearerAuth()
@Controller("admin/product-reviews")
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Get("all")
  findAll(@Query("statusType") statusType: StatusType) {
    return this.productReviewsService.findAll(statusType);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.productReviewsService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductReviewDto: UpdateProductReviewDto) {
    return this.productReviewsService.update(id, updateProductReviewDto);
  }
}
