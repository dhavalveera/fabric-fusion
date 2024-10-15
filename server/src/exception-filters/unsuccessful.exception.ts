import { HttpException, HttpStatus } from "@nestjs/common";

export class UnsuccessfulException extends HttpException {
  constructor() {
    super("Unable to process right now, please try again later", HttpStatus.BAD_REQUEST);
  }
}
