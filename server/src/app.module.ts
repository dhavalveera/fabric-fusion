import { APP_GUARD } from "@nestjs/core";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

// Nestjs TypeOrm
import { TypeOrmModule } from "@nestjs/typeorm";

// RateLimiter
import { ThrottlerModule } from "@nestjs/throttler";

// Nestjs Cache
import { CacheModule } from "@nestjs/cache-manager";

// Root Controller + Service
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Auth Guard
import { AuthGuard } from "./admin/auth/auth.guard";

// Middleware
import { RequestLoggerMiddleware } from "./middleware/request-logger/request-logger.middleware";

// DB Config
import { TypeOrmConfigService } from "./config/typeorm.config";

// Admin Modules
import { AuthModule as AdminAuthModule } from "./admin/auth/auth.module";
import { ProductCategoryModule as AdminProductCategoryModule } from "./admin/product-category/product-category.module";
import { ProductSubCategoryModule as AdminProductSubCategoryModule } from "./admin/product-sub-category/product-sub-category.module";
import { ProductSizeModule as AdminProductSizeModule } from "./admin/product-size/product-size.module";
import { ReturnPolicyModule as AdminReturnPolicyModule } from "./admin/return-policy/return-policy.module";
import { CareInstructionModule as AdminCareInstructionModule } from "./admin/care-instruction/care-instruction.module";
import { ProductsModule as AdminProductsModule } from "./admin/products/products.module";
import { ProductImagesModule as AdminProductImagesModule } from "./admin/product-images/product-images.module";
import { AdsModule as AdminAdsModule } from "./admin/ads/ads.module";
import { CouponModule as AdminCouponModule } from "./admin/coupon/coupon.module";
import { ProductAttributesModule as AdminProductAttributesModule } from "./admin/product-attributes/product-attributes.module";
import { OrdersModule as AdminOrdersModule } from "./admin/orders/orders.module";
import { ShippingModule as AdminShippingModule } from "./admin/shipping/shipping.module";

// Customer Modules
import { CommonModule } from "./customer/common/common.module";
import { AuthModule as CustomerAuthModule } from "./customer/auth/auth.module";
import { AddressModule as CustomerAddressModule } from "./customer/address/address.module";
import { WishlistModule as CustomerWishlistModule } from "./customer/wishlist/wishlist.module";

// Cron Modules
import { CouponsModule as CouponsCronModule } from "./cron_jobs/coupons/coupons.module";

// Email Module
import { EmailServiceModule } from "./email-service/email-service.module";

// Admin Controllers
import { AuthController as AdminAuthController } from "./admin/auth/auth.controller";
import { ProductCategoryController as AdminProductCategoryController } from "./admin/product-category/product-category.controller";
import { ProductSubCategoryController as AdminProductSubCategoryController } from "./admin/product-sub-category/product-sub-category.controller";
import { ProductsController as AdminProductsController } from "./admin/products/products.controller";
import { ProductImagesController as AdminProductImagesController } from "./admin/product-images/product-images.controller";
import { AdsController as AdminAdsController } from "./admin/ads/ads.controller";
import { CouponController as AdminCouponController } from "./admin/coupon/coupon.controller";
import { ProductAttributesController as AdminProductAttributesController } from "./admin/product-attributes/product-attributes.controller";
import { OrdersController as AdminOrdersController } from "./admin/orders/orders.controller";

// Customer Controllers
import { CommonController as CustomerCommonController } from "./customer/common/common.controller";
import { AuthController as CustomerAuthController } from "./customer/auth/auth.controller";
import { AddressController as CustomerAddressController } from "./customer/address/address.controller";
import { WishlistController as CustomerWishlistController } from "./customer/wishlist/wishlist.controller";

@Module({
  imports: [
    // for .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development", ".env.test", ".env.production"],
    }),

    // TypeORM DB Connection
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    // RateLimiter
    // no more than 3 calls in a second, 20 calls in 10 seconds, and 100 calls in a minute.
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000,
        limit: 3,
      },
      {
        name: "medium",
        ttl: 10000,
        limit: 20,
      },
      {
        name: "long",
        ttl: 60000,
        limit: 100,
      },
    ]),

    // ScheduleModule -> for CRON Jobs
    ScheduleModule.forRoot(),

    // Cache
    CacheModule.register({ isGlobal: true }),

    // Admin Modules
    AdminAuthModule,
    AdminProductCategoryModule,
    AdminProductSubCategoryModule,
    AdminProductSizeModule,
    AdminReturnPolicyModule,
    AdminCareInstructionModule,
    AdminProductsModule,
    AdminProductImagesModule,
    AdminAdsModule,
    AdminCouponModule,
    AdminProductAttributesModule,
    AdminOrdersModule,
    AdminShippingModule,

    // Cron Modules
    CouponsCronModule,

    // Email Module
    EmailServiceModule,

    // Customer Modules
    CommonModule,
    CustomerAuthModule,
    CustomerAddressModule,
    CustomerWishlistModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes(
        AppController,
        AdminAuthController,
        AdminProductCategoryController,
        AdminProductSubCategoryController,
        AdminProductsController,
        AdminProductImagesController,
        AdminAdsController,
        AdminCouponController,
        AdminProductAttributesController,
        AdminOrdersController,
        CustomerCommonController,
        CustomerAuthController,
        CustomerAddressController,
        CustomerWishlistController,
      );
  }
}
