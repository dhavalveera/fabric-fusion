import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

// App Module
import { AppModule } from "./app.module";

// Auth Middleware
// import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global prefix e.g. verisioning the URL, change v1 to v2 whenever required
  app.setGlobalPrefix("api/v1");

  // Binding `ValidationPipe` ensuring all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(new ValidationPipe());

  // Defining Global Middleware, for Route Specific Middleware define it in app.module.ts with forRoutes()
  // app.use(AuthMiddleware);

  const PORT = process.env.PORT || 7080;

  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
