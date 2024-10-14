// Expressjs
import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log("Middleware");

    next();
  } catch (error) {
    next(error);
  }
};
