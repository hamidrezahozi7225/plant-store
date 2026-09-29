import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { validate } from "../../lib/middleware/validate";
import { PaymentRequestSchema } from "./payment.schema";
import {
  PaymentRequestController,
  PaymentVerifyController,
} from "./payent.controller";

const PaymentRouter = Router();

PaymentRouter.post(
  "/payment-request",
  AuthorizeMiddleWare,
  validate({ body: PaymentRequestSchema }),
  PaymentRequestController,
);

PaymentRouter.get("/verify", PaymentVerifyController);

export default PaymentRouter;
