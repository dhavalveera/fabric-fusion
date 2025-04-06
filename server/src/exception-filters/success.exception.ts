import { HttpException, HttpStatus } from "@nestjs/common";

export class SuccessException extends HttpException {
  constructor(message: string = "Success") {
    super(message, HttpStatus.OK);
  }
}
