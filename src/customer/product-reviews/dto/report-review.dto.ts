import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ReportReviewDto {
  @IsNotEmpty({ message: "Reason should not be empty." })
  @IsString({ message: "Reason must be a string." })
  reason: string;

  @IsNotEmpty({ message: "Review ID should not be empty." })
  @IsUUID()
  productReviewFk: string;
}
