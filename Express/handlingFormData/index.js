import express from "express";
import route from "./routers.js";
import mongoose from "mongoose";


const app = express()
const PORT = 3000;
const MONGODB_URL = `mongodb+srv://JAYAVEL:jaya2005vel@cluster0.pghxx.mongodb.net/express`;

await mongoose.connect(MONGODB_URL).then(()=>{
    console.log("MongoDB connected successfully");
})

app.use(express.urlencoded({ extended: true }));

app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})