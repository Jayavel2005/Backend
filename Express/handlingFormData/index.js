import express from "express";
import route from "./routers.js";
import connectDB from "./config/db.js";


const app = express()
const PORT = 3000;

await connectDB();


app.use(express.urlencoded({ extended: true }));

app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})