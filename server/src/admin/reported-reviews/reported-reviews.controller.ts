import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";

// Swagger
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Service
import { ReportedReviewsService } from "./reported-reviews.service";

// DTO
import { UpdateReportedReviewsDto } from "./dto/update-reported-review.dto";

// types
import type { StatusType } from "./types";

@ApiTags("Reported Reviews")
@ApiBearerAuth()
@Controller("admin/reported-reviews")
export class ReportedReviewsController {
  constructor(private readonly reportedReviewsService: ReportedReviewsService) {}

  @Get("all")
  findAll(@Query("statusType") statusType: StatusType) {
    return this.reportedReviewsService.findAll(statusType);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.reportedReviewsService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductReviewDto: UpdateReportedReviewsDto) {
    return this.reportedReviewsService.update(id, updateProductReviewDto);
  }
}
