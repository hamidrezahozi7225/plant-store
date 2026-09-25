import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../module/auth/auth.model";

export const IsAdminMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user._id)
      return res.status(401).json({
        message: "please login",
      });

    const ExistsUser = await UserModel.findById(user._id);
    if (!ExistsUser) {
      return res.status(401).json({
        message: "please login",
      });
    }

    if (ExistsUser.role !== "admin") {
      return res.status(400).json({
        message: "you are not allowed",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
