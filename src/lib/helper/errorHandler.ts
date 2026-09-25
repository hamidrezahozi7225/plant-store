import { Request, Response, NextFunction } from "express";

type ErrorWithStatus = Error & {
  status?: number;
  statusCode?: number;
};

export const ErrorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || "internal server error",
    error: true,
  });
};
