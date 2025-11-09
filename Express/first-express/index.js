import express from "express";
import { searchController, usernameController } from "./controller.js";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.get("/user/:userName", usernameController);


app.get('/search', searchController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})