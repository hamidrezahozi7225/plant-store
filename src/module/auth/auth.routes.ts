import { Router } from "express";
import { validate } from "../../lib/middleware/validate";
import {
  CheckOtpModelSchema,
  SendOtpModelSchema,
  SignInModelSchema,
  UserModelSchema,
} from "./auth.schema";
import {
  CheckOtpController,
  SendOtpController,
  SignInController,
  SignUpController,
} from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post(
  "/signUp",
  validate({ body: UserModelSchema }),
  SignUpController,
);

AuthRouter.post(
  "/sendOtp",
  validate({ body: SendOtpModelSchema }),
  SendOtpController,
);

AuthRouter.post(
  "/checkOtp",
  validate({ body: CheckOtpModelSchema }),
  CheckOtpController,
);

AuthRouter.post(
  "/signIn",
  validate({ body: SignInModelSchema }),
  SignInController,
);

export default AuthRouter;
