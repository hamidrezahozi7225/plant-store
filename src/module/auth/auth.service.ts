import { compareSync, hash } from "bcryptjs";
import { UserModel } from "./auth.model";
import {
  CheckOtpModelTypes,
  SendOtpModelTypes,
  SignInModelTypes,
  UpdateProfileModelType,
  UpdateUserPasswordType,
  UserModelTypes,
} from "./auth.schema";
import jwt from "jsonwebtoken";

export const SignUpService = async (dto: UserModelTypes) => {
  const { mobile, password, userName } = dto;
  const ExsitsUser = await UserModel.findOne({ mobile, userName });
  console.log("eee", ExsitsUser);
  if (ExsitsUser) {
    throw new Error("user already exists");
  }

  const hashPassword = await hash(password!, 10);

  UserModel.create({
    mobile,
    password: hashPassword,
    userName,
  });
  return true;
};

export const SendOtpService = async (dto: SendOtpModelTypes) => {
  const { mobile } = dto;
  const ExsitsUser = await UserModel.findOne({ mobile });

  if (!ExsitsUser) {
    const User = await UserModel.create({
      mobile,
    });

    const value = Math.floor(Math.random() * 90000) + 10000;
    const expiresIn = Date.now() + 2 * 60 * 1000;

    const otp = { value: Number(value), expiresIn };
    User.otp = otp;
    await User.save();
    return true;
  }

  const value = Math.floor(Math.random() * 90000) + 10000;
  const expiresIn = Date.now() + 2 * 60 * 1000;
  const otp = { value: Number(value), expiresIn };
  ExsitsUser.otp = otp;
  await ExsitsUser.save();

  return true;
};

export const CheckOtpService = async (dto: CheckOtpModelTypes) => {
  const { code, mobile } = dto;
  const ExsitsUser = await UserModel.findOne({ mobile });
  if (!ExsitsUser) throw new Error("User Not Found");

  if (ExsitsUser.otp?.expiresIn && ExsitsUser.otp?.expiresIn < Date.now()) {
    throw new Error("Otp Invalid");
  }

  if (ExsitsUser.otp?.value && ExsitsUser.otp?.value !== code) {
    throw new Error("inCorrect otp");
  }

  const secret = process.env.JWT_SECRET!;
  const accessToken = jwt.sign({ id: ExsitsUser._id }, secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ id: ExsitsUser._id }, secret, {
    expiresIn: "3d",
  });

  return { accessToken, refreshToken };
};

export const SignInService = async (dto: SignInModelTypes) => {
  const { password, userName } = dto;
  const ExsitsUser = await UserModel.findOne({ userName });
  if (!ExsitsUser) {
    throw new Error("User Not Found Please Sign-Up");
  }
  const comparePassword = await compareSync(password, ExsitsUser.password!);
  if (!comparePassword) {
    throw new Error("username or password incorrect");
  }
  const secret = process.env.JWT_SECRET!;
  const accessToken = jwt.sign({ id: ExsitsUser._id }, secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ id: ExsitsUser._id }, secret, {
    expiresIn: "3d",
  });

  return { accessToken, refreshToken };
};

export const UpdateUserService = async (
  userId: string,
  dto: UpdateProfileModelType,
) => {
  const { password, addresses, profileImage } = dto;
  const User = await UserModel.findById(userId);
  if (!User) throw new Error("user not found");

  const comparePassword = compareSync(password, User.password!);
  if (!comparePassword) throw new Error("password is not correct");

  User.profileImage = profileImage;
  if (addresses && addresses?.length > 0) {
    User.addresses.push(...addresses);
  }
  await User.save();
  return true;
};

export const UpdateUserPasswordService = async (
  userId: string,
  dto: UpdateUserPasswordType,
) => {
  const { newPassword, password } = dto;
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User Not Found");

  const comparePassword = compareSync(password, user.password!);
  if (!comparePassword) throw new Error("password is not correct");

  const hashPassword = await hash(newPassword!, 10);

  user.password = hashPassword;
  await user.save();
  return true;
};
