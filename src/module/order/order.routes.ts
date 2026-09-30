import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { IsAdminMiddleWare } from "../../lib/middleware/isAdmin";
import { validate } from "../../lib/middleware/validate";
import { GetAllOrdersSchema, UpdateOrderStatusSchema } from "./order.schema";
import {
  getAllOrderForAdminController,
  getAllOrderForUserController,
  updateStatusOrderController,
} from "./order.controller";

const OrderRouter = Router();

OrderRouter.patch(
  "/update/:id",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ body: UpdateOrderStatusSchema }),
  updateStatusOrderController,
);

OrderRouter.get(
  "/all",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ query: GetAllOrdersSchema }),
  getAllOrderForAdminController,
);

OrderRouter.get(
  "/userOrder",
  AuthorizeMiddleWare,
  validate({ query: GetAllOrdersSchema }),
  getAllOrderForUserController,
);

export default OrderRouter;
