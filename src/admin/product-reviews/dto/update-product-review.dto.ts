// Swagger Modules
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

// CONSTANTS (ENUM)
import { ReviewAction } from "../constants/review-action.enum";
import { StatusEnumType } from "../constants/review-status.enum";

// Type
import { StatusType } from "../types";

export class UpdateProductReviewDto {
  @ApiProperty({ enum: StatusEnumType, enumName: "StatusType" })
  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(StatusEnumType, { message: "Status must be one of the following values: Pending, Reviewed, or Action Taken." })
  status: StatusType;

  @ApiPropertyOptional({ enum: ReviewAction, enumName: "ReviewAction" })
  @IsOptional()
  @IsEnum(ReviewAction, { message: "Review Action must be one of the following values: softDelete, permanentDelete" })
  reviewAction: "softDelete" | "permanentDelete";
}
