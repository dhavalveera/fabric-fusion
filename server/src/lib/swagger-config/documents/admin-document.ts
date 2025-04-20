import type { INestApplication } from "@nestjs/common";

// Swagger Modules
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// Modules
import { AdsModule } from "src/admin/ads/ads.module";
import { AuthModule } from "src/admin/auth/auth.module";
import { ProductCategoryModule } from "src/admin/product-category/product-category.module";
import { ProductSubCategoryModule } from "src/admin/product-sub-category/product-sub-category.module";
import { ProductsModule } from "src/admin/products/products.module";
import { ProductImagesModule } from "src/admin/product-images/product-images.module";
import { CouponModule } from "src/admin/coupon/coupon.module";
import { ProductAttributesModule } from "src/admin/product-attributes/product-attributes.module";
import { OrdersModule } from "src/admin/orders/orders.module";
import { ProductReviewsModule } from "src/admin/product-reviews/product-reviews.module";
import { RegionTagsModule } from "src/admin/region-tags/region-tags.module";
import { StaticPagesModule } from "src/admin/static-pages/static-pages.module";

export const AdminDocuments = (app: INestApplication) => {
  // Admin API options
  const adminOptions = new DocumentBuilder().setTitle("Admin APIs").setDescription("All Admin related APIs").addServer("http://localhost:7080", "Local Development").addBearerAuth().build();

  // Create ADMIN API document
  const adminDocument = SwaggerModule.createDocument(app, adminOptions, {
    include: [
      AdsModule,
      AuthModule,
      ProductCategoryModule,
      ProductSubCategoryModule,
      ProductsModule,
      ProductImagesModule,
      CouponModule,
      ProductAttributesModule,
      OrdersModule,
      ProductReviewsModule,
      RegionTagsModule,
      StaticPagesModule,
    ],
  });

  // Setup Admin API Swagger UI
  SwaggerModule.setup("api-docs/admin", app, adminDocument, {
    jsonDocumentUrl: "/api-docs/admin/swagger.json",
  });
};
