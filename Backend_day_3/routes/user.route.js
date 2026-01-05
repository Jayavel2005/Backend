import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// create user.

userRouter.get("/", authMiddleware, getAllUsers);

userRouter.get("/:id", authMiddleware, getUserById);

userRouter.put("/:id", authMiddleware, updateUser);

userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter;
