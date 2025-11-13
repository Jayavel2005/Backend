import { Router } from "express";
import { createuser, defaultRoute, multipleFileUploads, uploadFile, uploadImages } from "./controllers.js";
import multer from "multer";

const upload = multer();

const route = Router();


route.get('/', defaultRoute);
route.post('/form', createuser)
route.post('/upload', upload.single('image'), uploadFile);
route.post('/multipleFiles', upload.fields([{ name: 'image' }, { name: 'profile' }, { name: 'pdf' }]), multipleFileUploads)
route.post('/uploadImages', upload.array('image', 6), uploadImages);

export default route;