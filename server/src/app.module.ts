import { APP_GUARD } from "@nestjs/core";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Nestjs TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

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
import { ProductsModule as AdminProductsModule } from "./admin/products/products.module";
import { CategoryModule as AdminProductCategoryModule } from "./admin/category/category.module";
import { SubCategoryModule as AdminProductSubCategoryModule } from "./admin/sub-category/sub-category.module";

// Admin Controllers
import { ProductsController as AdminProductsController } from "./admin/products/products.controller";
import { CategoryController as AdminProductCategoryController } from "./admin/category/category.controller";
import { SubCategoryController as AdminProductSubCategoryController } from "./admin/sub-category/sub-category.controller";

@Module({
  imports: [
    // for .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development", ".env.test", ".env.production"],
    }),

    // for DB Connection
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: process.env.DB_TYPE as "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logger: "advanced-console",
        logging: "all",
      }),
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

    // Admin Modules
    AdminAuthModule,
    AdminProductsModule,
    AdminProductCategoryModule,
    AdminProductSubCategoryModule,
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
    consumer.apply(AuthMiddleware).forRoutes(AppController, AdminProductsController, AdminProductCategoryController, AdminProductSubCategoryController);
  }
}
