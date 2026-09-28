import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { IsAdminMiddleWare } from "../../lib/middleware/isAdmin";
import { validate } from "../../lib/middleware/validate";
import { CreateDiscuntController } from "./discount.controller";
import { CreateDiscountSchema } from "./discount.schema";

const DiscountRouter = Router();

DiscountRouter.post(
  "/create",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ body: CreateDiscountSchema }),
  CreateDiscuntController,
);

export default DiscountRouter;
