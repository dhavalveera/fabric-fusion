import { SequelizeModuleOptions } from "@nestjs/sequelize";

export const DBConfig: SequelizeModuleOptions = {
  dialect: process.env.DB_TYPE as "postgres",
  dialectOptions: {
    application_name: "Fabric_Fusion_API",
  },
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: true,
  timezone: "+05:30",
  repositoryMode: true,
};
