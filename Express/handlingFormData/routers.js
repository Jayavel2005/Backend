import { Router } from "express";
import {  defaultRoute, personRoute } from "./controllers.js";
import express from "express";
import upload from "./multerController.js";


const route = Router();


route.get('/', defaultRoute);
route.post('/person', express.json(), personRoute)
// route.post('/form', createuser)
// route.post('/upload', upload.single('image'), uploadFile);
// route.post('/multipleFiles', upload.fields([{ name: 'image' }, { name: 'profile' }, { name: 'pdf' }]), multipleFileUploads)
// route.post('/uploadImages', upload.array('image', 6), uploadImages);

export default route;