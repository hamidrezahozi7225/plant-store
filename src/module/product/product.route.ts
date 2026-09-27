import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { IsAdminMiddleWare } from "../../lib/middleware/isAdmin";
import { validate } from "../../lib/middleware/validate";
import {
  CreateProductSchema,
  GetSearchProductSchema,
  UpdateProductSchema,
} from "./product.schema";
import { Upload } from "../../lib/helper/multerConfig";
import {
  createProductController,
  deleteProductController,
  getProductByIdCOntroller,
  getProductController,
  getSearchProductController,
  updateProductController,
} from "./product.controller";

const ProductRouter = Router();

ProductRouter.post(
  "/create",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ body: CreateProductSchema }),
  createProductController,
);

ProductRouter.get("/:id", AuthorizeMiddleWare, getProductByIdCOntroller);
ProductRouter.get("/", AuthorizeMiddleWare, getProductController);
ProductRouter.get(
  "/search",
  AuthorizeMiddleWare,
  validate({ query: GetSearchProductSchema }),
  getSearchProductController,
);

ProductRouter.patch(
  "/update/:id",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  validate({ body: UpdateProductSchema }),
  updateProductController,
);

ProductRouter.delete(
  "/delete/:id",
  AuthorizeMiddleWare,
  IsAdminMiddleWare,
  deleteProductController,
);

export default ProductRouter;
