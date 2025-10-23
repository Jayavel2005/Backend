const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

})
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);

})