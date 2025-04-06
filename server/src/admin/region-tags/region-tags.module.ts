import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { RegionTagsService } from "./region-tags.service";
import { RegionTagsController } from "./region-tags.controller";

// Model
import { RegionTagModel } from "./entities/region-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RegionTagModel])],
  controllers: [RegionTagsController],
  providers: [RegionTagsService],
  exports: [TypeOrmModule],
})
export class RegionTagsModule {}
