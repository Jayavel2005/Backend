import { Router } from "express";
import { createuser, defaultRoute, uploadFile } from "./controllers.js";
import multer from "multer";

const upload = multer();

const route = Router();


route.get('/', defaultRoute);
route.post('/form', createuser)
route.post('/upload', upload.single('image'), uploadFile);

export default route;