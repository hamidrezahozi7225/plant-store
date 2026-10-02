import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { validate } from "../../lib/middleware/validate";
import { AddChargeWalletSchema } from "./wallet.schema";
import {
  AddChargeWalletController,
  VerifyWalletVerifyController,
} from "./wallet.controller";

const WalletRouter = Router();

WalletRouter.post(
  "/charge",
  AuthorizeMiddleWare,
  validate({ body: AddChargeWalletSchema }),
  AddChargeWalletController,
);

WalletRouter.get("/verify", VerifyWalletVerifyController);

export default WalletRouter;
