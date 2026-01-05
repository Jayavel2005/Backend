import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword } from "../utils/passwordHash.js";



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
