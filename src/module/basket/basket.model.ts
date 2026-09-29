import { model, Schema } from "mongoose";

export const BasketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

export const BasketModel = model("Basket", BasketSchema);
