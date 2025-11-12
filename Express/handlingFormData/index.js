import express from "express";
import route from "./routers.js";

const app = express()

app.use(express.urlencoded({ extended: true }));


const PORT = 3000;


app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})