import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReturnPolicyDto {
  @IsNotEmpty()
  @IsNumber()
  returnDuration: number;

  @IsNotEmpty()
  @IsString()
  returnWindow: string;

  @IsNotEmpty()
  @IsArray({ always: true, message: "List of Conditions should be array" })
  conditions: Array<string>;

  @IsNotEmpty()
  @IsString()
  policyInformation: string;
}
