import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { verifyPassword } from "../utils/passwordHash.js";
import { generateToken } from "../utils/token.js";

export const loginService = async ({ email, password }) => {
  if (!email || !password)
    throw new ApiError(400, "Email and Password required.");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(401, "Invalid Credentials.");

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid Credentials");

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return { token, user };
};
