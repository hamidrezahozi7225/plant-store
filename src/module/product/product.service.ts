import { CategoryModel } from "../category/category.model";
import { ProductModel } from "./product.model";
import { CreateProductType, UpdateProductType } from "./product.schema";

export const createProductService = async (dto: CreateProductType) => {
  const { amount, categoryId, description, discount, name, price, images } =
    dto;

  const category = await CategoryModel.findById(categoryId);
  if (!category) throw new Error("category not found");

  await ProductModel.create({
    amount,
    description,
    name,
    price,
    discount,
    images,
    cateogoryId: category._id,
    categoriesId: [...(category.parentsId ?? []), category._id],
  });
  return true;
};

export const getProductService = async () => {
  const products = await ProductModel.find().populate("categoriesId");
  return products;
};

export const getSearchProductService = async (name: string) => {
  const products = await ProductModel.find({
    name: { $regex: name, $options: "i" },
  });
  return products;
};

export const getProductByIdService = async (id: string) => {
  const product = await ProductModel.findById(id);
  return product;
};

export const updateProductService = async (
  id: string,
  dto: UpdateProductType,
) => {
  const product = await ProductModel.findById(id);
  if (!product) throw new Error("product not found");

  const { amount, categoryId, description, images, name, price, discount } =
    dto;

  // 1️⃣ فقط وقتی categoryId فرستاده شده و تغییر کرده
  if (categoryId && product?.cateogoryId?.toString() !== categoryId) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) throw new Error("category not found");

    product.cateogoryId = category._id;
    product.categoriesId = [...(category.parentsId ?? []), category._id];
  }

  // 2️⃣ فقط فیلدهایی که تعریف شدن رو آپدیت کن
  if (amount !== undefined) product.amount = amount;
  if (description !== undefined) product.description = description;
  if (images !== undefined) product.images = images;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (discount !== undefined) product.discount = discount;

  await product.save();
  return product;
};

export const deleteProductService = async (id: string) => {
  await ProductModel.deleteOne({ _id: id });
  return true;
};
