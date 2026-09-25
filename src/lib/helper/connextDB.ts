import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();
export const ConnectDb = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("connect DB");
  } catch (error) {
    throw new Error("connection Error");
  }
};
