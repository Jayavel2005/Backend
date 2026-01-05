import express from "express";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use("/api/users/", userRouter);
app.use("/auth", authRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Day 03 server is running firely 🔥.",
  });
});

export default app;
