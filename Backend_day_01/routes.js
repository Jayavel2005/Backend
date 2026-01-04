import { Router } from "express";

const appRouter = Router();

appRouter.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy ✌️" });
});

appRouter.post("/echo", (req, res) => {
  const { name, role } = req.body;
  console.log(req.body);

  res.status(201).json({
    receivedData: {
      name: name,
      role: role,
    },
  });
});

appRouter.get("/time", (req, res) => {
  res.status(200).json({
    currentTime: new Date(),
  });
});

export default appRouter;
