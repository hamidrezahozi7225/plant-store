import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { validate } from "../../lib/middleware/validate";
import {
  AddProductToBasketSchema,
  DeleteProductToBasketSchema,
} from "./basket.schema";
import {
  AddProductToBasketController,
  DeleteProductToBasketController,
  GetBasketController,
} from "./basket.controller";

const BasketRouter = Router();

BasketRouter.post(
  "/create",
  AuthorizeMiddleWare,
  validate({ body: AddProductToBasketSchema }),
  AddProductToBasketController,
);

BasketRouter.delete(
  "/delete",
  AuthorizeMiddleWare,
  validate({ body: DeleteProductToBasketSchema }),
  DeleteProductToBasketController,
);

BasketRouter.get("/", AuthorizeMiddleWare, GetBasketController);

export default BasketRouter;
