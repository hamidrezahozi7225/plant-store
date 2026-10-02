import { Request, Response, NextFunction } from "express";
import {
  CheckOtpService,
  SendOtpService,
  SignInService,
  SignUpService,
  UpdateUserPasswordService,
  UpdateUserService,
} from "./auth.service";

export const SignUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await SignUpService(req.body);
    res.status(201).json({
      message: "user created",
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const SendOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("miai inja", req.body);
    await SendOtpService(req.body);
    res.status(200).json({
      message: "Otp Send",
    });
  } catch (error) {
    next(error);
  }
};

export const CheckOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = await CheckOtpService(req.body);
    res.status(200).json({
      message: "login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const SignInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = await SignInService(req.body);
    res.status(200).json({
      message: "login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await UpdateUserService(req.user.id, req.body);
  res.status(200).json({
    message: "update profile successful",
  });
  try {
  } catch (error) {
    next(error);
  }
};

export const UpdateUserPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await UpdateUserPasswordService(req.user.id, req.body);
    res.status(200).json({
      message: "password updated",
    });
  } catch (error) {
    next(error);
  }
};
