import jwt from "jsonwebtoken";
import { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN } from "../config/env.js";

export const generateToken = (payload, secret) => {
  console.log(payload);

  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_SECRET_REFRESH_TOKEN);
};
