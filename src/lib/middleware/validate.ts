import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

type Schemas = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
  headers?: ZodType;
};

export const validate =
  (schemas: Schemas) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) Object.assign(req.body, schemas.body.parse(req.body));
      if (schemas.query)
        Object.assign(req.query, schemas.query.parse(req.query));
      if (schemas.params)
        Object.assign(req.params, schemas.params.parse(req.params));

      if (schemas.headers) {
        // store parsed headers separately — do NOT mutate req.headers
        (req as any).validatedHeaders = schemas.headers.parse(req.headers);
      }

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
