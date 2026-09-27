import { Request, Response, NextFunction } from "express";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductService,
  getSearchProductService,
  updateProductService,
} from "./product.service";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await createProductService(req.body);
    res.status(201).json({
      message: "create product successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getProductController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await getProductService();
    res.status(200).json({
      message: "success",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getSearchProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.query;
    const productas = await getSearchProductService(name as string);
    res.status(200).json({
      productas,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdCOntroller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await getProductByIdService(req.params.id as string);
    res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await updateProductService(String(id)!, req.body);
    res.status(201).json({
      message: "update successful",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteProductService(String(id)!);
    res.status(201).json({
      message: "delete successful",
    });
  } catch (error) {
    next(error);
  }
};
