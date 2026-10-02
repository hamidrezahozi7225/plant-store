import { model, Schema } from "mongoose";

const OtpSchema = new Schema({
  value: {
    type: Number,
    default: "",
  },
  expiresIn: {
    type: Number,
    default: Date.now(),
  },
});

const AddressesSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  plate: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    maxlength: 10,
  },
});

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
    maxlength: 11,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  otp: {
    type: OtpSchema,
  },
  addresses: {
    type: [AddressesSchema],
  },
  favoriteGoods: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
  },
  profileImage: {
    type: String,
  },
});

export const UserModel = model("users", UserSchema);

AddressesSchema.index({ postalCode: 1 }, { unique: true, sparse: true });
