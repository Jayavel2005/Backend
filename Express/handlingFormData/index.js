import express from "express";
import route from "./routers.js";

const app = express();


const PORT = 3000;


app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})