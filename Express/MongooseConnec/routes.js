import { Router } from "express";
import { defaultController, fetchCookie,clearCookie } from "./controller.js";


const route = new Router();


route.get("/",defaultController);

route.get("/fetch", fetchCookie)

route.get("/clear", clearCookie);

export default route;