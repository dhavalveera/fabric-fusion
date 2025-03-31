import { IsString } from "class-validator";

export class CareInstructionDto {
  @IsString()
  washingInstructions?: string;

  @IsString()
  dryingInstructions?: string;

  @IsString()
  ironingInstructions?: string;

  @IsString()
  bleachingInstructions?: string;

  @IsString()
  dryCleaningInstructions?: string;

  @IsString()
  storageInstructions?: string;
}
