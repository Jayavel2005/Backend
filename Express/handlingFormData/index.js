import express from "express";
import route from "./routers.js";
import multer from "multer";

const app = express()
const upload = multer();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image'));
app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})