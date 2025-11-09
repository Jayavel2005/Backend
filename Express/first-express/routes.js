import express from "express";
import { defultController, searchController, usernameController } from "./controller.js";

const route = express.Router();

route.get('/', defultController);
route.get('/user/:userName', usernameController);
route.get("/search", searchController);

export default route