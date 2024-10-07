import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Auth Middleware
// import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Defining Global Middleware, for Route Specific Middleware define it in app.module.ts with forRoutes()
  // app.use(AuthMiddleware);

  await app.listen(7080);
}
bootstrap();
