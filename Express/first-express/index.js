import express from "express";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.get("/user/:userName", (req, res) => {
    res.send(`Hello ${req.params.userName}`);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})