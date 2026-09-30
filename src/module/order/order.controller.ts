import { Request, Response, NextFunction } from "express";
import {
  getAllOrderForAdminService,
  getAllOrderForUserService,
  updateStatusOrderService,
} from "./order.service";
import { statusEnumType } from "./order.schema";

export const updateStatusOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateStatusOrderService(req.params.id as string, req.body.status);
    res.status(200).json({
      message: "status updated",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrderForAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, status } = req.query;
    const orders = await getAllOrderForAdminService(
      Number(page),
      Number(limit),
      status as statusEnumType,
    );
    res.status(200).json({
      message: "get order successful",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrderForUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, status } = req.query;
    const orders = await getAllOrderForUserService(
      req.user.id,
      Number(page),
      Number(limit),
      status as statusEnumType,
    );
    res.status(200).json({
      message: "get order successful",
      orders,
    });
  } catch (error) {
    next(error);
  }
};
