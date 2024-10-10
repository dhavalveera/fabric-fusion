import { PartialType } from "@nestjs/mapped-types";

// class validator
import { IsNotEmpty, IsString } from "class-validator";

import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @IsString()
  productCategoryName: string;
}
