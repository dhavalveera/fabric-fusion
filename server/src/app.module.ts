import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Nestjs TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Middleware
import { AuthMiddleware } from "./middleware/auth.middleware";

// Admin Modules
import { AdminAuthModule } from "./admin/auth/auth.module";
import { ProductsModule as AdminProductsModule } from "./admin/products/products.module";
import { ProductsController as AdminProductsController } from "./admin/products/products.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.test", ".env.production"],
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logger: "simple-console",
      logging: "all",
    }),

    // Admin Modules
    AdminAuthModule,
    AdminProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController, AdminProductsController);
  }
}
