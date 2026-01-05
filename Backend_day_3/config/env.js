import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRESIN = process.env.JWT_EXPIRESIN;
