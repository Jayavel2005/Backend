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


// Read Stream
// Reads the file in chunks and emits the data event for each chunk
// Emits the end event when the file is completely read
// Emits the error event if any error occurs

// const readStream = fs.createReadStream("Backend/NodeJs/FileSystem/sample.txt", "utf8");
// const datas = [];
// readStream.on("data", (chunk)=>{
//     datas.push(chunk);
// })

// readStream.on('end', ()=>{
//     console.log(datas.join(""));
//     console.log("File read completed!");
// })


// readStream.on("error",(err)=>{
//     console.log(err.message);
// })


// write Stream
// Writes the data to the file in chunks
// Emits the error event if any error occurs
// Emits the finish event when the file is completely written

// const writeStream = fs.createWriteStream("Backend/NodeJs/FileSystem/ouput2.txt");

// writeStream.write("Vanakam da Mapla! ");
// writeStream.write("I am from write stream!");

// writeStream.end();

// writeStream.on("finish", () => {
//     console.log("File written succesfully!");
// })

// writeStream.on("error",(err)=>{
//     console.log(err.message);

// })

// Pipeline
// Connects the output of one stream to the input of another stream
// Emits the error event if any error occurs
// Emits the finish event when the file is completely written

// const readStream = fs.createReadStream("Backend/NodeJs/FileSystem/smple.txt", "utf8");
// const writeStream = fs.createWriteStream("Backend/NodeJs/FileSystem/ouput2.txt");

// readStream.pipe(writeStream);
// readStream.on("error", (err) => {
//     console.log(err.message);
// });
// writeStream.on("finish", () => {
//     console.log("File written succesfully!");
// });


// Read Line for large sized files using readline module
// Reads the file line by line and emits the line event for each line
// Emits the end event when the file is completely read
// Emits the error event if any error occurs

const readLine = require("readline");

const readStream = fs.createReadStream("Backend/NodeJs/FileSystem/sample.txt", "utf8");

const readLineStream = readLine.createInterface({
    input: readStream
})


readLineStream.on("line", (line) => {
    console.log("Line read:", line);
});

readLineStream.on("close", () => {
    console.log("File read completed!");
});

