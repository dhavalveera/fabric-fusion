// Swagger
import { ApiProperty } from "@nestjs/swagger";

// Class Validator (verifying req body)
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

// ENUM
import { StaticPageType } from "../constants";

export class CreateStaticPageDto {
  @ApiProperty({ enum: StaticPageType, enumName: "pageType" })
  @IsNotEmpty({ message: "Page Type is required" })
  @IsEnum(StaticPageType, { message: "Page Type must be one of the following values: ABOUT, TNC or PRIVACY." })
  pageType: StaticPageType;

  @ApiProperty()
  @IsNotEmpty({ message: "Page Meta Title is required" })
  @IsString({ always: true, message: "Page Meta Title must be string" })
  pageMetaTitle: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Page Meta Description is required" })
  @IsString({ always: true, message: "Page Meta Description must be string" })
  pageMetaDescription: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Page Content is required" })
  @IsString({ always: true, message: "Page Content must be string" })
  pageContent: string;
}
