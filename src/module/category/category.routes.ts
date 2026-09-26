import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { IsAdminMiddleWare } from "../../lib/middleware/isAdmin";
import { validate } from "../../lib/middleware/validate";
import { CreateCategorySchema, UpdateCategorySchema } from "./category.schema";
import { HeadersSchema } from "../../lib/types";
import {
  CreateCategoryController,
  DeleteCategoryController,
  GetCategoryController,
  UpdateCategoryController,
} from "./category.controller";

const CategoryRouter = Router();

CategoryRouter.post(
  "/create",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ body: CreateCategorySchema }),
  CreateCategoryController,
);

CategoryRouter.get("/", AuthorizeMiddleWare, GetCategoryController);

CategoryRouter.patch(
  "/update/:id",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ body: UpdateCategorySchema }),
  UpdateCategoryController,
);

CategoryRouter.delete(
  "/delete/:id",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  DeleteCategoryController,
);

export default CategoryRouter;
