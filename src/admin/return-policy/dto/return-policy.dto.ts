// Swagger Modules
import { ApiProperty } from "@nestjs/swagger";

// class-validator -- to validate the body
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReturnPolicyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  returnDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  returnWindow: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray({ always: true, message: "List of Conditions should be array" })
  conditions: Array<string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  policyInformation: string;
}
