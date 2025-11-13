import { Router } from "express";
import { createuser, defaultRoute, uploadFile } from "./controllers.js";

const route = Router();


route.get('/', defaultRoute);
route.post('/form', createuser)
route.post('/upload', uploadFile);

export default route;