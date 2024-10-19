import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { AdsService } from "./ads.service";
import { AdsController } from "./ads.controller";

// Model
import { AdsModel } from "./entities/ad.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AdsModel])],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [TypeOrmModule],
})
export class AdsModule {}
