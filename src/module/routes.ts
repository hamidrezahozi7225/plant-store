import { Router } from "express";
import AuthRouter from "./auth/auth.routes";
import CategoryRouter from "./category/category.routes";
import ProductRouter from "./product/product.route";
import UploadRouter from "./Upload/upload.routes";

const AllRouter = Router();

AllRouter.use("/auth", AuthRouter);
AllRouter.use("/category", CategoryRouter);
AllRouter.use("/product", ProductRouter);
AllRouter.use("/upload", UploadRouter);

export default AllRouter;
