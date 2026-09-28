import { Request, Response, NextFunction } from "express";
import { CreateDiscountService } from "./discount.service";

export const CreateDiscuntController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CreateDiscountService(req.body);
    res.status(201).json({
      message: "discount created",
    });
  } catch (error) {
    next(error);
  }
};
