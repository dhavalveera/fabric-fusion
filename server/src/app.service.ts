import { Injectable } from "@nestjs/common";

// Sequelize
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}

  getHello(): string {
    return "Hello World! This is Nestjs";
  }
}
