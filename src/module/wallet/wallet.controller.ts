import { Request, Response, NextFunction } from "express";
import {
  AddChargeWalletService,
  VerifyWalletVerifyService,
} from "./wallet.service";

export const AddChargeWalletController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("injaa");
  const response = await AddChargeWalletService(req.user.id, req.body);
  if (!response) {
    res.status(500).json({
      message: "error occured",
    });
  }
  res.status(200).json({
    data: response,
  });
  try {
  } catch (error) {
    next(error);
  }
};

export const VerifyWalletVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await VerifyWalletVerifyService(
      String(req.query.Authority)!,
      req.query.Status! as "OK" | "NOK",
    );
    if (data) {
      res.status(200).json({
        message: "wallet charge success",
        ref_id: data?.ref_id,
        card_pan: data?.card_pan,
      });
    } else {
      res.status(500).json({
        message: "error occured",
      });
    }
  } catch (error) {
    next(error);
  }
};
