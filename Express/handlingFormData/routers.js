import { Router } from "express";
import { createuser, defaultRoute } from "./controllers.js";

const route = Router();


route.get('/', defaultRoute);
route.post('/form', createuser)

export default route;