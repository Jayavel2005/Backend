import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Error connecting Database");
  }
};
