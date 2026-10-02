import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { validate } from "../../lib/middleware/validate";
import { PaymentRequestSchema, PaymentViaWalletSchema } from "./payment.schema";
import {
  PaymentRequestController,
  PaymentVerifyController,
  PaymentViadWalletController,
} from "./payent.controller";

const PaymentRouter = Router();

PaymentRouter.post(
  "/payment-request",
  AuthorizeMiddleWare,
  validate({ body: PaymentRequestSchema }),
  PaymentRequestController,
);

PaymentRouter.get("/verify", PaymentVerifyController);

PaymentRouter.post(
  "/wallet",
  AuthorizeMiddleWare,
  validate({ body: PaymentViaWalletSchema }),
  PaymentViadWalletController,
);

export default PaymentRouter;
