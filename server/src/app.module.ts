import { APP_GUARD } from "@nestjs/core";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Nestjs Sequelize
import { SequelizeModule } from "@nestjs/sequelize";

// RateLimiter
import { ThrottlerModule } from "@nestjs/throttler";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// AuthGuard
import { AuthGuard } from "./admin/auth/auth.guard";

// Middleware
import { AuthMiddleware } from "./middleware/auth.middleware";

// Admin Modules
import { AdminAuthModule } from "./admin/auth/auth.module";
import { CategoryModule as AdminProductCategoryModule } from "./admin/category/category.module";
import { SubCategoryModule as AdminProductSubCategoryModule } from "./admin/sub-category/sub-category.module";
// import { ProductsModule as AdminProductsModule } from "./admin/products/products.module";
// import { ProductSizesModule as AdminProductSizeModule } from "./admin/product-sizes/product-sizes.module";

// Admin Controllers
// import { ProductsController as AdminProductsController } from "./admin/products/products.controller";
import { CategoryController as AdminProductCategoryController } from "./admin/category/category.controller";
import { SubCategoryController as AdminProductSubCategoryController } from "./admin/sub-category/sub-category.controller";

// DB Config
import { DBConfig } from "./config/db.config";

@Module({
  imports: [
    // for .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development", ".env.test", ".env.production"],
    }),

    // for DB Connection
    SequelizeModule.forRoot(DBConfig),

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

    // Admin Modules
    AdminAuthModule,
    // AdminProductsModule,
    AdminProductCategoryModule,
    AdminProductSubCategoryModule,
    // AdminProductSizeModule,
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
    consumer.apply(AuthMiddleware).forRoutes(
      AppController,
      // AdminProductsController,
      AdminProductCategoryController,
      AdminProductSubCategoryController,
    );
  }
}
