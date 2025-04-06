import { BadRequestException, Logger } from "@nestjs/common";

// Express
import { NextFunction, Request, Response } from "express";

export const requireQueryParamsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger("RequireQueryParamsMiddleware");

  const requiredParams: Record<string, Array<string>> = {
    "/api/admin/orders/all": ["pageNumber", "pageSize", "orderStatus"],
  };

  const paramsForRoute = requiredParams[req.path];
  if (paramsForRoute) {
    const missingParams = paramsForRoute.filter(param => !req.query[param]);

    // If additional params for the route are missing, log and throw an error
    if (missingParams.length > 0) {
      logger.error(`Missing query params for ${req.path}: ${missingParams.join(", ")}`);

      throw new BadRequestException(`Missing query params for ${req.path}: ${missingParams.join(", ")}`);
    }
  }

  next();
};
