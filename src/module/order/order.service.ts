import { OrderModel } from "./order.model";
import { statusEnumType } from "./order.schema";

export const updateStatusOrderService = async (
  id: string,
  status: statusEnumType,
) => {
  const Order = await OrderModel.findById(id);
  if (!Order) throw new Error("order not found");

  Order.status = status;
  await Order.save();
  return true;
};

export const getAllOrderForAdminService = async (
  page: number = 1,
  limit: number = 10,
  status?: statusEnumType,
) => {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 10));
  const skip = (safePage - 1) * safeLimit;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .populate("products.productId")
      .populate("products.userId")
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(safeLimit),
    OrderModel.countDocuments(filter),
  ]);

  return {
    orders,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
      hasNextPage: safePage * safeLimit < total,
      hasPrevPage: safePage > 1,
    },
  };
};

export const getAllOrderForUserService = async (
  userId: string,
  page: number = 1,
  limit: number = 10,
  status?: statusEnumType,
) => {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 10));
  const skip = (safePage - 1) * safeLimit;

  const filter: Record<string, unknown> = { "products.userId": userId };
  if (status) filter.status = status;

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .populate("products.productId")
      .populate("products.userId")
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(safeLimit),
    OrderModel.countDocuments(filter),
  ]);

  return {
    orders,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
      hasNextPage: safePage * safeLimit < total,
      hasPrevPage: safePage > 1,
    },
  };
};
