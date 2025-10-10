const path = require('path');

const fileName = 'example.txt';
const directory = '/user/local'
try {
    const fullPath = path.join(directory, fileName);
    console.log(fullPath);
    
} catch (error) {
    console.log(error);

}