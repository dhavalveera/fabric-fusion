import { Module } from "@nestjs/common";

// Controller + Service
import { ReportedReviewsService } from "./reported-reviews.service";
import { ReportedReviewsController } from "./reported-reviews.controller";

@Module({
  controllers: [ReportedReviewsController],
  providers: [ReportedReviewsService],
})
export class ReportedReviewsModule {}
