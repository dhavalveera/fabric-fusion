// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsInt, Min } from "class-validator";

export class UpdateCartQuantityDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
