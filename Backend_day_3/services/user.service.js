import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword } from "../utils/passwordHash.js";

export const createUserService = async ({ name, email, password }) => {
  if (!email) throw new ApiError(400, "Email is required.");
  if (!password) throw new ApiError(400, "Password is required.");

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) throw new ApiError(409, "User already exists");
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const fetchAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const userById = async ({ id }) => {
  const user = await User.findOne({
    _id: id,
  });

  if (!user) throw new ApiError(404, "User not found.");

  return user;
};

export const updateUserById = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password");

  return updatedUser;
};

export const deleUserById = async ({ id }) => {
  const user = await User.findOne({ _id: id });
  if (!user) throw new ApiError(404, "User not found.");
  await User.deleteOne({ _id: id });
};
