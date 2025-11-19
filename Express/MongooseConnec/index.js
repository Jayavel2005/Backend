import dotenv from "dotenv"
dotenv.config();
import express from "express"
import connectDB from "./config/db.js";
import route from "./routes.js";

const app = express();
app.use(express.json());
await connectDB();

app.use(route)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})