import { Injectable, Logger } from "@nestjs/common";

// Nestjs TypeORM
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger("TypeORMConfigService");

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      applicationName: "Fabric_Fusion_API",
      logger: "advanced-console",
      logging: "all",
      ssl: process.env.NODE_ENV === "production",
    };
  }
}
