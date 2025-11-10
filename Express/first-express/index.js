import express from "express";
import route from "./routes.js";

const app = express();
const PORT = 3000;

app.use(express.json())

app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})