import { Router } from "express";
import {
  echo,
  getId,
  getLanguage,
  getTime,
  health,
  welcome,
} from "../controllers/app.controller.js";

const appRouter = Router();

appRouter.get("/", welcome);

appRouter.get("/health", health);

appRouter.post("/echo", echo);

appRouter.get("/time", getTime);

appRouter.get("/user/:id", getId);

appRouter.get("/search", getLanguage);

export default appRouter;
