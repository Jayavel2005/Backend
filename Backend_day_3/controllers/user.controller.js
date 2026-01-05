import {
  deleUserById,
  fetchAllUsers,
  updateUserById,
  userById,
} from "../services/user.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userById(req.params);
    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await deleUserById(req.params);
    res
      .status(201)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};
