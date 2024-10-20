import { HttpException, HttpStatus } from "@nestjs/common";

export class UnsuccessfulException extends HttpException {
  constructor(message: string = "Unable to process right now, please try again later") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
