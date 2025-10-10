const fs = require("fs");

// async file reading which uses callback

// fs.readFile("E:/NodeJS/Backend/NodeJs/FileSystem/sample.txt", "utf8", (err, data) => {
//     if (err) {
//         console.error("Failed to read file:", err.message);
//         return; 
//     }
//     console.log(data);
// });

// sync file reading
const data = fs.readFileSync("E:/NodeJS/Backend/NodeJs/FileSystem/sample.txt","utf8");

console.log(data);
