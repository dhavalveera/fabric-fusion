// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class UpdateProductReviewDto {
  @ApiProperty({ example: 3 })
  @IsNotEmpty({ message: "Rating should not be empty." })
  @IsInt({ message: "Rating must be an integer between 1 and 5." })
  @Min(1, { message: "Rating must be at least 1." }) // Minimum rating of 1
  @Max(5, { message: "Rating must be at most 5." }) // Maximum rating of 5
  ratingStar: number;

  @ApiProperty({ example: "Product Review Title" })
  @IsNotEmpty({ message: "Title should not be empty." })
  @IsString({ message: "Title must be a string." })
  ratingTitle: string;

  @ApiProperty({ example: "Some Long Long Long Rating Comment" })
  @IsNotEmpty({ message: "Comment should not be empty." })
  @IsString({ message: "Comment must be a string." })
  ratingComment: string;
}
