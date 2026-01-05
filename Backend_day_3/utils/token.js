import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const generateToken = (payload) => {
  console.log(payload);

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const verifyToken = (token) => {
  const verify = jwt.verify(token, JWT_SECRET);
  return verify;
};
