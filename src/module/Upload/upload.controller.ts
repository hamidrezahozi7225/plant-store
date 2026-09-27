import { Request, Response, NextFunction } from "express";

export const UploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      message: "upload file successful",
      url: req?.file?.path,
    });
  } catch (error) {
    next(error);
  }
};

export const UploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = Array.isArray(req.files) ? req.files : [];

    res.status(200).json({
      message: "upload file successful",
      urls: files?.map((item) => item.path),
    });
  } catch (error) {
    next(error);
  }
};
