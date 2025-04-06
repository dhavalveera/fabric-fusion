// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ReportReviewDto {
  @ApiProperty({ example: "some random reason" })
  @IsNotEmpty({ message: "Reason should not be empty." })
  @IsString({ message: "Reason must be a string." })
  reason: string;

  @ApiProperty({ example: "some-random-product-uuid" })
  @IsNotEmpty({ message: "Review ID should not be empty." })
  @IsUUID()
  productReviewFk: string;
}
