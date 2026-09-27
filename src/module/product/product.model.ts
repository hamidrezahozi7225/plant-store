import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  comment: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
  },
  cateogoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  categoriesId: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
  },
});

export const ProductModel = model("Product", ProductSchema);
