import {
  JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
} from "../config/env.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/passwordHash.js";
import {
  generateToken,
  verifyRefreshToken,
} from "../utils/token.js";

/* LOGIN */
export const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateToken(
    { id: user._id, role: user.role },
    JWT_SECRET_ACCESS_TOKEN
  );

  const refreshToken = generateToken(
    { id: user._id },
    JWT_SECRET_REFRESH_TOKEN
  );

  // save refresh token
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken, user };
};

/* SIGNUP */
export const signupService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  const accessToken = generateToken(
    { id: user._id, role: user.role },
    JWT_SECRET_ACCESS_TOKEN
  );

  return { user, accessToken };
};

/* REFRESH */
export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  verifyRefreshToken(refreshToken);

  const newAccessToken = generateToken(
    { id: user._id, role: user.role },
    JWT_SECRET_ACCESS_TOKEN
  );

  return { accessToken: newAccessToken };
};

/* LOGOUT */
export const logoutService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(400, "Refresh token required");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = undefined;
  await user.save();
};
