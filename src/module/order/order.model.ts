import { model, Schema } from "mongoose";
import { BasketSchema } from "../basket/basket.model";

const OrderSchema = new Schema({
  products: {
    type: [BasketSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "deliver", "cancel"],
    defualt: "pending",
  },
});

export const OrderModel = model("Order", OrderSchema);
