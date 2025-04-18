import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Types
import { UserType } from "src/all-types";

// Service
import { ProductReviewsService } from "./product-reviews.service";

// DTO
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { ReportReviewDto } from "./dto/report-review.dto";

@ApiTags("Product Reviews")
@ApiBearerAuth()
@Controller("user/product-reviews")
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post("create")
  create(@Body() createProductReviewDto: CreateProductReviewDto, @UserInRequest() userInfo: UserType) {
    return this.productReviewsService.create(createProductReviewDto, userInfo);
  }

  @Get(":productid/all")
  findAll(@Param("productid") productId: string) {
    return this.productReviewsService.findAll(productId);
  }

  @Get("customer")
  getAllReviewsOfCustomer(@UserInRequest() userInfo: UserType) {
    return this.productReviewsService.getAllReviewsOfCustomer(userInfo);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductReviewDto: UpdateProductReviewDto, @UserInRequest() userInfo: UserType) {
    return this.productReviewsService.update(id, updateProductReviewDto, userInfo);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string, @UserInRequest() userInfo: UserType) {
    return this.productReviewsService.remove(id, userInfo);
  }

  @Post("/report")
  reportReview(@Body() reportReviewBody: ReportReviewDto, @UserInRequest() userInfo: UserType) {
    return this.productReviewsService.reportReview(reportReviewBody, userInfo);
  }
}
