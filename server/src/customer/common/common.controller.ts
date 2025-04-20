import { Controller, Get, Param } from "@nestjs/common";

// Swagger Modules
import { ApiTags } from "@nestjs/swagger";

// Decorator to Skip Auth Check
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";

// ENUM
import { StaticPageType } from "src/admin/static-pages/constants";

// Service
import { CommonService } from "./common.service";

@ApiTags("Home Page APIs")
@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @SkipAuth()
  @Get("recommendation/banners")
  getAllAds() {
    return this.commonService.getAllAdsService();
  }

  @SkipAuth()
  @Get("recommendation/category/all")
  getAllCategory() {
    return this.commonService.getAllCategoryService();
  }

  @SkipAuth()
  @Get("recommendation/sub-category/:id/all")
  getAllSubCategory(@Param("id") id: string) {
    return this.commonService.getAllSubCategoryService(id);
  }

  @SkipAuth()
  @Get("recommendation/sub-category/:id/details")
  getSubCategDetails(@Param("id") id: string) {
    return this.commonService.getSubCategDetailsService(id);
  }

  @SkipAuth()
  @Get("recommendation/products/:subCategId/all")
  getProductsOfSubCateg(@Param("subCategId") subCategId: string) {
    return this.commonService.getProductsOfSubCategService(subCategId);
  }

  @SkipAuth()
  @Get("recommendation/products/newest")
  getNewestProducts() {
    return this.commonService.getNewestProducts();
  }

  @SkipAuth()
  @Get("recommendation/products/low-stock")
  getLowStockProducts() {
    return this.commonService.getLowStockItemsService();
  }

  @SkipAuth()
  @Get("recommendation/most-loved")
  findMostLovedProducts() {
    return this.commonService.findMostLovedProductsService();
  }

  @SkipAuth()
  @Get("recommendation/product-region-tags")
  getAllRegionTags() {
    return this.commonService.getAllRegionTags();
  }

  @SkipAuth()
  @Get("recommendation/product-region-tags/:regionTagId/products")
  getAllProductsOfRegionTags(@Param("regionTagId") regionTagId: string) {
    return this.commonService.getAllProductsOfSingleRegionTag(regionTagId);
  }

  @SkipAuth()
  @Get("static-page/:pageType")
  getStaticPageContent(@Param("pageType") pageType: string) {
    return this.commonService.getStaticPageContent(pageType as StaticPageType);
  }
}
