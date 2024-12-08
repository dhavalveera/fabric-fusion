import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

// Type
import { StatusType } from "../types";

export class UpdateProductReviewDto {
  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(["Pending", "Reviewed", "Action Taken"], { message: "Status must be one of the following values: Pending, Reviewed, or Action Taken." })
  status: StatusType;

  @IsOptional()
  @IsEnum(["softDelete", "permanentDelete"], { message: "Review Action must be one of the following values: softDelete, permanentDelete" })
  reviewAction: "softDelete" | "permanentDelete";
}
