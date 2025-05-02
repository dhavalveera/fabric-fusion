import { Module } from "@nestjs/common";

// Service + Controller
import { FeedsService } from "./feeds.service";
import { FeedsController } from "./feeds.controller";

@Module({
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
