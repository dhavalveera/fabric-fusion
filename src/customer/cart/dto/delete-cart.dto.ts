import { IsArray, IsUUID } from "class-validator";

export class DeleteCartDto {
  @IsArray()
  @IsUUID("all", { each: true })
  cartItemIds: Array<string>;
}
