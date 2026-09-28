import { randomBytes } from "crypto";
import { UserModel } from "../auth/auth.model";
import { DiscountModel } from "./discount.model";
import { CreateDiscountType } from "./discount.schema";

export const CreateDiscountService = async (dto: CreateDiscountType) => {
  const { expiresIn, persentage, userId } = dto;

  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User Not Found");

  const discount = await DiscountModel.findOne({ userId });
  if (
    !!discount &&
    discount?.expiresIn?.getTime() &&
    discount?.expiresIn?.getTime() > Date.now()
  ) {
    throw new Error("already have discount");
  }

  let code: string = "";
  let exists = true;

  while (exists) {
    code = `OFF-${randomBytes(4).toString("hex").toUpperCase()}`;
    exists = !!(await DiscountModel.exists({ code }));
  }

  await DiscountModel.create({
    userId,
    expiresIn,
    persentage,
    code,
  });

  return true;
};
