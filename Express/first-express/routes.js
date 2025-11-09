import express from "express";
import { createUser, defultController, searchController, usernameController } from "./controller.js";

const route = express.Router();

route.get('/', defultController);
route.get('/user/:userName', usernameController);
route.get("/search", searchController);

route.post("/user", express.json(), createUser)

export default route