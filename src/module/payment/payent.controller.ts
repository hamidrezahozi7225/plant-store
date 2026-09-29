import { Request, Response, NextFunction } from "express";
import { PaymentRequestService, PaymentVerifyService } from "./payment.service";

export const PaymentRequestController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await PaymentRequestService(req.body);
    if (!response) {
      res.status(500).json({
        message: "error occured",
      });
    }
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("query", req.query);
    const data = await PaymentVerifyService(
      String(req.query.Authority)!,
      req.query.Status! as "OK" | "NOK",
    );
    if (data) {
      res.status(200).json({
        message: "payment success",
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
