import { Router } from "express";
import {
  login,
  logout,
  refresh_Token,
  signup,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refresh", refresh_Token);
authRouter.post("/logout", logout);

export default authRouter;
