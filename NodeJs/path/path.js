const path = require('path');
const fs = require("fs");

const fileName = 'example.txt';
const directory = '/user/local'
try {
    const fullPath = path.join(directory, fileName);
    console.log(fullPath);

} catch (error) {
    console.log(error);

}


// fs.mkdir('./path/new', (err) => {
//     if (err) return console.error("Error creating directory:", err);
//     console.log("Directory created successfully!");
// })

// fs.mkdirSync('./path/new2');

// reading the directory

// fs.readdir("./path", (err, files) => {
//     if (err) return console.error("Error reading directory:", err);
//     console.log("Files in the directory:");
//     files.forEach((file) => {
//         console.log(file);
//     })


// })

// console.log(fs.readdirSync('./path'));


// Check if a file or directory exists
// const filePath = './path/new4';
// if(fs.existsSync(filePath)){
//     console.log(`The path ${filePath} exists.`);
// }else{
//     console.log(`The path ${filePath} does not exist.`);

// }

// // remove a file or directory
// fs.rmdir('./path/new', (err) => {
//     if (err) return console.error("Error removing directory:", err);
//     console.log("Directory removed successfully!");
// })

// fs.rmdirSync('./path/new2');

// // rm works recursively when the folder has files

// fs.rm('./path/new', { recursive: true }, (err) => {
//     if (err) return console.error("Error removing directory:", err);
//     console.log("Directory removed successfully!");
// })


// renaming the directory
// fs.rename('./path/new2', './path/path2', (err) => {
//     if (err) return console.error("Error renaming directory:", err);
//     console.log("Directory renamed successfully!");
// })


// fs.renameSync('./path/path2', './path/new2');

// get the dir stats

// fs.stat('./path/new2', (err, stats) => {
//     if (err) return console.error("Error getting directory stats:", err);
//     console.log("Directory stats:", stats.isDirectory());
// });


// monitoring the directory
fs.watch("./", (eventType, fileName) => {
    console.log(eventType);
    if (fileName) {
        console.log(fileName);
        
    }

})
