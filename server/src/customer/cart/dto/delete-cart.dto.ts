// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsArray, IsUUID } from "class-validator";

export class DeleteCartDto {
  @ApiProperty({
    example: ["some-random-id-one", "some-random-id-two"],
  })
  @IsArray()
  @IsUUID("all", { each: true })
  cartItemIds: Array<string>;
}
