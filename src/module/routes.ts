import { Router } from "express";
import AuthRouter from "./auth/auth.routes";
import CategoryRouter from "./category/category.routes";

const AllRouter = Router();

AllRouter.use("/auth", AuthRouter);
AllRouter.use("/category", CategoryRouter);

export default AllRouter;
