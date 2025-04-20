import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { StaticPagesService } from "./static-pages.service";
import { StaticPagesController } from "./static-pages.controller";

// Model
import { StaticPageModel } from "./entities/static-page.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StaticPageModel])],
  controllers: [StaticPagesController],
  providers: [StaticPagesService],
  exports: [TypeOrmModule],
})
export class StaticPagesModule {}
