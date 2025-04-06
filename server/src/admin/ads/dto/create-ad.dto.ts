// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateAdDto {
  @ApiProperty({
    example: "https://images.google.com/some-image-name.png",
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  adsImageUrl: string;

  @ApiProperty({ example: "some Title" })
  @IsNotEmpty()
  @IsString()
  imgTitle: string;
}
