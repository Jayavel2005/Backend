const url = require("url");

const myUrl = new URL("https://example.com:5000/path/name?jayavel=sf");
console.log(myUrl.host);
console.log(myUrl.hostname);
console.log(myUrl.href);
console.log(myUrl.pathname)
console.log(myUrl.searchParams.get("jayavel"));

