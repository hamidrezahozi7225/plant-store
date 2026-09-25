import { Request, Response, NextFunction } from "express";
import { error } from "node:console";

export const NotFoundHandler = (
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  response.status(404).json({
    message: "not found route",
    error: true,
  });
};
