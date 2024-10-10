// Expressjs
import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");

      console.log("token => ", token);

      next();
    } else {
      console.log("No Authorization Headers Available!.");

      res.status(401).send("Access Token Missing");
    }
  } catch (error) {
    next(error);
  }
};
