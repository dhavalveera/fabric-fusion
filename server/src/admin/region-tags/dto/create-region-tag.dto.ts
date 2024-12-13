import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionTagDto {
  @IsNotEmpty({ message: "Region Tag Name is required." })
  @IsString({ message: "Region Tag Name must be String." })
  regionTagName: string;

  @IsNotEmpty({ message: "Region Tag Description is required." })
  @IsString({ message: "Region Tag Description must be String." })
  description: string;
}
