import express from "express";
import appRouter from "./routes/routes.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api", appRouter);

export default app;
