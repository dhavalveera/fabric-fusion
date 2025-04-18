import { Controller, Get, Param } from "@nestjs/common";

// Swagger Modules
import { ApiTags } from "@nestjs/swagger";

// Decorator to Skip Auth Check
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";

// Service
import { CommonService } from "./common.service";

@ApiTags("Home Page APIs")
@Controller("common/recommendation")
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @SkipAuth()
  @Get("banners")
  getAllAds() {
    return this.commonService.getAllAdsService();
  }

  @SkipAuth()
  @Get("category/all")
  getAllCategory() {
    return this.commonService.getAllCategoryService();
  }

  @SkipAuth()
  @Get("sub-category/:id/all")
  getAllSubCategory(@Param("id") id: string) {
    return this.commonService.getAllSubCategoryService(id);
  }

  @SkipAuth()
  @Get("sub-category/:id/details")
  getSubCategDetails(@Param("id") id: string) {
    return this.commonService.getSubCategDetailsService(id);
  }

  @SkipAuth()
  @Get("products/:subCategId/all")
  getProductsOfSubCateg(@Param("subCategId") subCategId: string) {
    return this.commonService.getProductsOfSubCategService(subCategId);
  }

  @SkipAuth()
  @Get("products/newest")
  getNewestProducts() {
    return this.commonService.getNewestProducts();
  }

  @SkipAuth()
  @Get("products/low-stock")
  getLowStockProducts() {
    return this.commonService.getLowStockItemsService();
  }

  @SkipAuth()
  @Get("most-loved")
  findMostLovedProducts() {
    return this.commonService.findMostLovedProductsService();
  }

  @SkipAuth()
  @Get("product-region-tags")
  getAllRegionTags() {
    return this.commonService.getAllRegionTags();
  }

  @SkipAuth()
  @Get("product-region-tags/:regionTagId/products")
  getAllProductsOfRegionTags(@Param("regionTagId") regionTagId: string) {
    return this.commonService.getAllProductsOfSingleRegionTag(regionTagId);
  }
}
