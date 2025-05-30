import { APP_GUARD } from "@nestjs/core";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitterModule } from "@nestjs/event-emitter";

// Nestjs TypeOrm
import { TypeOrmModule } from "@nestjs/typeorm";

// RateLimiter
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

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
import { ProductReviewsModule as AdminProductReviewsModule } from "./admin/product-reviews/product-reviews.module";
import { RegionTagsModule as AdminRegionTagsModule } from "./admin/region-tags/region-tags.module";
import { StaticPagesModule as AdminStaticPagesModule } from "./admin/static-pages/static-pages.module";
import { ReportedReviewsModule as AdminReportedReviewsModule } from "./admin/reported-reviews/reported-reviews.module";

// Customer Modules
import { CommonModule } from "./customer/common/common.module";
import { AuthModule as CustomerAuthModule } from "./customer/auth/auth.module";
import { AddressModule as CustomerAddressModule } from "./customer/address/address.module";
import { WishlistModule as CustomerWishlistModule } from "./customer/wishlist/wishlist.module";
import { CartModule as CustomerCartModule } from "./customer/cart/cart.module";
import { ProfileModule as CustomerProfileModule } from "./customer/profile/profile.module";
import { SearchModule as CustomerSearchModule } from "./customer/search/search.module";
import { ProductReviewsModule as CustomerProductReviewsModule } from "./customer/product-reviews/product-reviews.module";
import { RecentlyViewedModule as CustomerRecentlyViewedModule } from "./customer/recently-viewed/recently-viewed.module";
import { OrderModule as CustomerOrderModule } from "./customer/order/order.module";
import { PaymentModule as CustomerPaymentModule } from "./customer/payment/payment.module";
import { CouponModule as CustomerCouponModule } from "./customer/coupon/coupon.module";

// Cron Modules
import { CouponsModule as CouponsCronModule } from "./cron_jobs/coupons/coupons.module";
import { OtpAuthModule } from "./cron_jobs/otp-auth/otp-auth.module";

// Email Module
import { EmailServiceModule } from "./email-service/email-service.module";

// Utils Module
import { UtilsServiceModule } from "./payment-utils/payment-utils.module";

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
import { ShippingController as AdminShippingController } from "./admin/shipping/shipping.controller";
import { ProductReviewsController as AdminProductReviewsController } from "./admin/product-reviews/product-reviews.controller";
import { RegionTagsController as AdminRegionTagsController } from "./admin/region-tags/region-tags.controller";
import { StaticPagesController as AdminStaticPagesController } from "./admin/static-pages/static-pages.controller";
import { ReportedReviewsController as AdminReportedReviewsController } from "./admin/reported-reviews/reported-reviews.controller";

// Customer Controllers
import { CommonController as CustomerCommonController } from "./customer/common/common.controller";
import { AuthController as CustomerAuthController } from "./customer/auth/auth.controller";
import { AddressController as CustomerAddressController } from "./customer/address/address.controller";
import { WishlistController as CustomerWishlistController } from "./customer/wishlist/wishlist.controller";
import { CartController as CustomerCartController } from "./customer/cart/cart.controller";
import { ProfileController as CustomerProfileController } from "./customer/profile/profile.controller";
import { SearchController as CustomerSearchController } from "./customer/search/search.controller";
import { ProductReviewsController as CustomerProductReviewsController } from "./customer/product-reviews/product-reviews.controller";
import { RecentlyViewedController as CustomerRecentlyViewedController } from "./customer/recently-viewed/recently-viewed.controller";
import { OrderController as CustomerOrderController } from "./customer/order/order.controller";
import { PaymentController as CustomerPaymentController } from "./customer/payment/payment.controller";
import { CouponController as CustomerCouponController } from "./customer/coupon/coupon.controller";

// Common Module + Controller
import { AuthOtpModule } from "./auth-otp/auth-otp.module";
import { AuthOtpController } from "./auth-otp/auth-otp.controller";

// Feeds Module + Controller => for GSearch, Bing & Pinterest
import { FeedsModule } from "./feeds/feeds.module";
import { FeedsController } from "./feeds/feeds.controller";

// Cache Invalidator Module
import { CacheInvalidatorModule } from "./cache-invalidator/cache-invalidator.module";

@Module({
  imports: [
    // for .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development", ".env.test", ".env.production"],
      cache: true,
    }),

    // TypeORM DB Connection
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    // RateLimiter
    // no more than 3 calls in a second, 20 calls in 10 seconds, and 100 calls in a minute.
    ThrottlerModule.forRoot([
      {
        // 1 Seconds => 3 Requests per 1 Second
        name: "short",
        ttl: 1000,
        limit: 3,
      },
      {
        // 10 Seconds => 20 Requests per 10 Second
        name: "medium",
        ttl: 10000,
        limit: 20,
      },
      {
        // 60 Seconds => 30 Requests per 60 Second / 1 Minute
        name: "long",
        ttl: 60000,
        limit: 30,
      },
    ]),

    // Event Emitter
    EventEmitterModule.forRoot({ global: true }),

    // ScheduleModule -> for CRON Jobs
    ScheduleModule.forRoot(),

    // Cache
    CacheModule.register({ isGlobal: true, ttl: 0 }),

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
    AdminProductReviewsModule,
    AdminRegionTagsModule,
    AdminStaticPagesModule,
    AdminReportedReviewsModule,

    // Cron Modules
    CouponsCronModule,

    // Email Module
    EmailServiceModule,

    // Utils Module
    UtilsServiceModule,

    // Customer Modules
    CommonModule,
    CustomerAuthModule,
    CustomerAddressModule,
    CustomerWishlistModule,
    CustomerCartModule,
    CustomerProfileModule,
    CustomerSearchModule,
    CustomerProductReviewsModule,
    CustomerRecentlyViewedModule,
    CustomerOrderModule,
    CustomerPaymentModule,
    CustomerCouponModule,

    // Common Module
    AuthOtpModule,

    // 2FA Module
    OtpAuthModule,

    // Cache Invalidator Module
    CacheInvalidatorModule,

    // Feeds Module => for GSearch, Bing & Pinterest
    FeedsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes(
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
      AdminShippingController,
      AdminProductReviewsController,
      AdminRegionTagsController,
      AdminStaticPagesController,
      AdminReportedReviewsController,
      CustomerCommonController,
      CustomerAuthController,
      CustomerAddressController,
      CustomerWishlistController,
      CustomerCartController,
      CustomerProfileController,
      CustomerSearchController,
      CustomerProductReviewsController,
      CustomerRecentlyViewedController,
      CustomerOrderController,
      CustomerPaymentController,
      CustomerCouponController,
      AuthOtpController,
      FeedsController, // Feeds Module + Controller => for GSearch, Bing & Pinterest
    );
  }
}
