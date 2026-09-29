import { Router } from "express";
import AuthRouter from "./auth/auth.routes";
import CategoryRouter from "./category/category.routes";
import ProductRouter from "./product/product.route";
import UploadRouter from "./Upload/upload.routes";
import DiscountRouter from "./discount/discount.routes";
import BasketRouter from "./basket/basket.route";
import PaymentRouter from "./payment/payment.routes";
import OrderRouter from "./order/order.routes";

const AllRouter = Router();

AllRouter.use("/auth", AuthRouter);
AllRouter.use("/category", CategoryRouter);
AllRouter.use("/product", ProductRouter);
AllRouter.use("/upload", UploadRouter);
AllRouter.use("/discount", DiscountRouter);
AllRouter.use("/basket", BasketRouter);
AllRouter.use("/payment", PaymentRouter);
AllRouter.use("/order", OrderRouter);

export default AllRouter;
