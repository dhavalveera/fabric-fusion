import { APP_GUARD } from "@nestjs/core";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Nestjs TypeOrm
import { TypeOrmModule } from "@nestjs/typeorm";

// RateLimiter
import { ThrottlerModule } from "@nestjs/throttler";

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
import { AuthModule } from "./admin/auth/auth.module";

// Admin Controllers
import { AuthController } from "./admin/auth/auth.controller";

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

    // Admin Modules
    AuthModule,
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
    consumer.apply(RequestLoggerMiddleware).forRoutes(AppController, AuthController);
  }
}
