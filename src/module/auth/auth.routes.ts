import { Router } from "express";
import { validate } from "../../lib/middleware/validate";
import {
  CheckOtpModelSchema,
  SendOtpModelSchema,
  SignInModelSchema,
  UpdateProfileModelSchema,
  UpdateUserPasswordSchema,
  UserModelSchema,
} from "./auth.schema";
import {
  CheckOtpController,
  SendOtpController,
  SignInController,
  SignUpController,
  UpdateUserController,
  UpdateUserPasswordController,
} from "./auth.controller";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";

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

AuthRouter.patch(
  "/update-profile",
  AuthorizeMiddleWare,
  validate({ body: UpdateProfileModelSchema }),
  UpdateUserController,
);

AuthRouter.patch(
  "/reset-password",
  AuthorizeMiddleWare,
  validate({ body: UpdateUserPasswordSchema }),
  UpdateUserPasswordController,
);

export default AuthRouter;
