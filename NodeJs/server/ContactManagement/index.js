// File importing
const http = require("http");
const fs = require('fs');
const path = require('path');

// file path

const filePath = path.join(__dirname, "contacts.json");

if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, "[]", (err) => {
        if (err) return console.error("File creation error");
    })

    console.log("File created");
} else {
    console.log("File already exists");
}



const server = http.createServer((req, res) => {

})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is runnin on http://localhost:${PORT}`);

})