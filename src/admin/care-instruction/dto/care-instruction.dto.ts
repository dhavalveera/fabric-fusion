// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsString } from "class-validator";

export class CareInstructionDto {
  @ApiProperty({ example: "some cloth washing instruction" })
  @IsString()
  washingInstructions?: string;

  @ApiProperty({ example: "some cloth drying instruction" })
  @IsString()
  dryingInstructions?: string;

  @ApiProperty({ example: "some cloth ironing instruction" })
  @IsString()
  ironingInstructions?: string;

  @ApiProperty({ example: "some cloth bleaching instruction" })
  @IsString()
  bleachingInstructions?: string;

  @ApiProperty({ example: "some cloth dry cleaning instruction" })
  @IsString()
  dryCleaningInstructions?: string;

  @ApiProperty({ example: "some cloth storage instruction" })
  @IsString()
  storageInstructions?: string;
}
