import { model, Schema } from "mongoose";

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  authority: {
    type: String,
  },
  card_pan: {
    type: String,
  },
  ref_id: {
    type: String,
  },
});

export const PaymentModel = model("Payment", PaymentSchema);
