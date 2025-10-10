const crypto = require('crypto');

const hash = crypto.createHash("sha256");
hash.update("jayavel");
console.log(hash.digest("binary"));