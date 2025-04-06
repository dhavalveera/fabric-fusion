import { HttpException, HttpStatus } from "@nestjs/common";

export class CreatedException extends HttpException {
  constructor(message: string = "Created Successfully!.") {
    super(message, HttpStatus.CREATED);
  }
}
