import express from "express";
import route from "./routes.js";

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static("public"));
app.use(express.static("images"))

app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})