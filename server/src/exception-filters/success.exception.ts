import { HttpException, HttpStatus } from "@nestjs/common";

export class SuccessException extends HttpException {
  constructor() {
    super("Success", HttpStatus.OK);
  }
}
