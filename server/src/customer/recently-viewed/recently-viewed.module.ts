import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { RecentlyViewedService } from "./recently-viewed.service";
import { RecentlyViewedController } from "./recently-viewed.controller";

// Model
import { RecentlyViewedProductsModel } from "./entities/recently-viewed.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecentlyViewedProductsModel])],
  controllers: [RecentlyViewedController],
  providers: [RecentlyViewedService],
  exports: [TypeOrmModule],
})
export class RecentlyViewedModule {}
