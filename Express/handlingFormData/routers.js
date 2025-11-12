import { Router } from "express";
import { defaultRoute } from "./controllers.js";

const route = Router();


route.get('/', defaultRoute);

export default route;