import { model, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    parentsId: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
    subCategories: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model("Category", CategorySchema);
