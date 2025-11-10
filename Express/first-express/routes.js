import express from "express";
import { createUser, defultController, searchController, updateUser, usernameController, deleteUser, getUser } from "./controller.js";

const route = express.Router();

route.get('/', defultController);
route.get('/user/:userName', usernameController);
route.get("/search", searchController);

route.post("/user", createUser)
route.put("/user/:id", updateUser);

route.delete("/user/:id", deleteUser);

route.get("/things/:name/:id", getUser);


export default route