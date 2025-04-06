// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionTagDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Region Tag Name is required." })
  @IsString({ message: "Region Tag Name must be String." })
  regionTagName: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Region Tag Description is required." })
  @IsString({ message: "Region Tag Description must be String." })
  description: string;
}
