import { model, Schema } from "mongoose";

const WalletSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  amount: {
    type: Number,
    defualt: 0,
  },
});

export const WalletModel = model("Wallet", WalletSchema);
