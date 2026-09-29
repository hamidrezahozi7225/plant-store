import { Request, Response, NextFunction } from "express";
import {
  AddProductToBasketService,
  DeleteProductToBasketService,
  GetBasketService,
} from "./basket.service";

export const AddProductToBasketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await AddProductToBasketService(req.body);
  res.status(201).json({
    message: "add to basket successful",
  });
  try {
  } catch (error) {
    next(error);
  }
};

export const DeleteProductToBasketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await DeleteProductToBasketService(req.body);
    res.status(200).json({
      message: "delete successful",
    });
  } catch (error) {
    next(error);
  }
};

export const GetBasketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const baskets = await GetBasketService(req.user.id);
    res.status(200).json({
      message: "basckets",
      baskets,
    });
  } catch (error) {
    next(error);
  }
};
