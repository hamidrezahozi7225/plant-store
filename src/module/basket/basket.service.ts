import { UserModel } from "../auth/auth.model";
import { ProductModel } from "../product/product.model";
import { BasketModel } from "./basket.model";
import {
  AddProductToBasketType,
  DeleteProductToBasketType,
} from "./basket.schema";

export const AddProductToBasketService = async (
  dto: AddProductToBasketType,
) => {
  const { productId, userId } = dto;
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("user not found");
  const product = await ProductModel.findById(productId);
  if (!product) throw new Error("product not found");

  const basket = await BasketModel.findOne({ productId, userId });
  let totalAmount = 0;

  if (basket) {
    basket.count++;
    if (
      product.discount?.expiresIn &&
      product.discount?.expiresIn.getTime() > Date.now() &&
      product.discount?.persentage > 0
    ) {
      const discountedPrice =
        product.price * (1 - product.discount.persentage / 100);
      totalAmount = discountedPrice * basket.count;
    } else {
      totalAmount = product.price * basket.count;
    }
    basket.totalAmount = totalAmount;
    await basket.save();
    return true;
  }

  if (
    product.discount?.expiresIn &&
    product.discount?.expiresIn.getTime() > Date.now() &&
    product.discount?.persentage > 0
  ) {
    const discountedPrice =
      product.price * (1 - product.discount.persentage / 100);
    totalAmount = discountedPrice;
  } else {
    totalAmount = product.price;
  }

  await BasketModel.create({
    productId,
    userId,
    count: 1,
    totalAmount,
  });
  return true;
};

export const DeleteProductToBasketService = async (
  dto: DeleteProductToBasketType,
) => {
  const { productId, userId } = dto;
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("user not found");
  const product = await ProductModel.findById(productId);
  if (!product) throw new Error("product not found");

  const basket = await BasketModel.findOne({ productId, userId });
  if (!basket) throw new Error("Basket Not Found");

  if (basket.count > 1) {
    let totalAmount;
    basket.count--;
    if (
      product.discount?.expiresIn &&
      product.discount?.expiresIn.getTime() > Date.now() &&
      product.discount?.persentage > 0
    ) {
      const discountedPrice =
        product.price * (1 - product.discount.persentage / 100);
      totalAmount = discountedPrice * basket.count;
    } else {
      totalAmount = product.price * basket.count;
    }
    basket.totalAmount = totalAmount;

    await basket.save();
    return true;
  } else {
    await BasketModel.deleteOne({ _id: basket._id });
    return true;
  }
};

export const GetBasketService = async (userId: string) => {
  const baskets = await BasketModel.find({ userId }).populate("productId");
  console.log("bask", baskets);
  return baskets;
};
