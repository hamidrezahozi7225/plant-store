import { Request, Response, NextFunction } from "express";
import {
  CreateCategoryService,
  DeleteCategoryService,
  GetCategoryService,
  UpdateCategoryService,
} from "./category.service";

export const CreateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CreateCategoryService(req.body);
    res.status(201).json({
      message: "Category Created",
    });
  } catch (error) {
    next(error);
  }
};

export const GetCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Categories = await GetCategoryService();
    res.status(200).json({
      Categories,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("req", req.params.id);
    await UpdateCategoryService(req.params.id! as string, req.body);
    res.status(201).json({
      message: "category update successful",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await DeleteCategoryService(req.params.id as string);
    res.status(201).json({
      message: "Delete Category Successful",
    });
  } catch (error) {
    next(error);
  }
};
