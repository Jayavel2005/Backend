import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express"

import route from "./routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(route)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})