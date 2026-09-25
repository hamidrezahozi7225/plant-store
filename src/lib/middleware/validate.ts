import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

// Use ZodType instead of ZodSchema
type Schemas = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

export const validate =
  (schemas: Schemas) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // You can use Object.assign to safely mutate req properties
      if (schemas.body) Object.assign(req.body, schemas.body.parse(req.body));
      if (schemas.query)
        Object.assign(req.query, schemas.query.parse(req.query));
      if (schemas.params)
        Object.assign(req.params, schemas.params.parse(req.params));

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.issues,
        });
        return;
      }
      next(err);
    }
  };
