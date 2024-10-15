import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Model
import { ReturnPolicyModel } from "./entities/return-policy.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReturnPolicyModel])],
  exports: [TypeOrmModule],
})
export class ReturnPolicyModule {}
