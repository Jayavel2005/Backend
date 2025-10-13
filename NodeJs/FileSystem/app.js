const fs = require("fs");
const http = require('http');

// async file reading which uses callback

// fs.readFile("E:/NodeJS/Backend/NodeJs/FileSystem/sample.txt", "utf8", (err, data) => {
//     if (err) {
//         console.error("Failed to read file:", err.message);
//         return;
//     }
//     console.log(data);
// });

// sync file reading
// const data = fs.readFileSync("E:/NodeJS/Backend/NodeJs/FileSystem/sample.txt","utf8");

// console.log(data);

// async file writing

// fs.writeFile("E:/NodeJS/Backend/NodeJs/FileSystem/output.txt", 'Hello, I am from file writing', (err) => {
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     console.log("File written succesfully!");

// })

// // sync file writing

// fs.writeFileSync("E:/NodeJS/Backend/NodeJs/FileSystem/output.txt", "Vanakam da Mapla!");

