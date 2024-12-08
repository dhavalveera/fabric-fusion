import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateRecentlyViewedDto {
  @IsNotEmpty({ message: "Product ID is required." })
  @IsUUID()
  productDetailsFk: string;
}
