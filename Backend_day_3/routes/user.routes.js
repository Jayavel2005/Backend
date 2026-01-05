import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

// create user.
userRouter.post("/", createUser);

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
