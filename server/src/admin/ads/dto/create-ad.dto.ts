import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  adsImageUrl: string;

  @IsNotEmpty()
  @IsString()
  imgTitle: string;
}
