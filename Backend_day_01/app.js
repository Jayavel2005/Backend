import express from "express";
import appRouter from "./routes.js";

const app = express();

app.use(express.json());
app.use("/api", appRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to my backend server 01 🔥" });
});

export default app;
