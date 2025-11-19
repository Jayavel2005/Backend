import { Router } from "express";

const route = new Router();


route.get("/", (req, res) => {
    res.send("API is running...");
});

export default route;