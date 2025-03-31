import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger("RequestLogger");

  use(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.log(`route=${req.originalUrl}  requestMethod:${req.method}`);

      next();
    } catch (error) {
      this.logger.error(`Error: ${error}`);

      next(error);
    }
  }
}
