import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productDetailsFk: string;
}
