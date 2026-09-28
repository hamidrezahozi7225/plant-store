import { model, Schema } from "mongoose";

const DiscountSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  persentage: {
    type: Number,
    required: true,
    default: 0,
  },
  expiresIn: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export const DiscountModel = model("Discount", DiscountSchema);
