import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { IsAdminMiddleWare } from "../../lib/middleware/isAdmin";

const CategoryRouter = Router();

CategoryRouter.get("/", AuthorizeMiddleWare, IsAdminMiddleWare, (req) => {
  console.log("reee", req.user);
});

export default CategoryRouter;
