import { NestFactory, Reflector } from "@nestjs/core";
import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";

// App Module
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const logger = new Logger("AppRunning");

  const app = await NestFactory.create(AppModule);

  // global prefix e.g. verisioning the URL
  app.setGlobalPrefix("api");

  // Binding `ValidationPipe` ensuring all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // ClassSerializerInterceptor -> is used to provide rules for transforming and sanitizing the data to be returned to the client such as sending only a subset of properties of an entity.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const PORT = process.env.PORT || 7080;

  await app.listen(PORT, async () => {
    logger.verbose(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
