import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Model
import { CareInstructionModel } from "./entities/care-instruction.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CareInstructionModel])],
  exports: [TypeOrmModule],
})
export class CareInstructionModule {}
