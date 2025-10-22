// const http = require('http');


// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', "text/plain")
//     res.end("Hello World!");
// })

// server.listen(3000, "127.0.0.1", () => {
//     console.log("Listening on port 3000");
// });

const http = require("http");
const route = require("./routes");
const { url } = require("inspector");
const path = require("path");

const middleWare = (req, res, next) => {
    next(req, res);
}

const server = http.createServer((req, res) => {
    // if (req.method === "GET" && req.url === "/") {
    //     const statusCode = 200;
    //     res.writeHead(statusCode, { "content-type": "text/plain" });
    //     res.write("Hello World!");
    //     res.end();
    // } else {
    //     const statusCode = 404;
    //     res.writeHead(statusCode, { "content-type": "text/plain" });
    //     res.write("404 Not Found!");
    //     res.end();
    // }

    // if (req.method === "GET" && req.url === "/") {
    //     const statusCode = 200;
    //     const form = `
    //     <form method="POST" action="/submit">
    //         <input type="text" name="username" placeholder="Enter your username">
    //         <input type="password" name="password" placeholder="Enter your password">
    //         <button type="submit">Submit</button>
    //     </form>
    //     `
    //     res.writeHead(statusCode, { "content-type": "text/html" });
    //     res.write(form);
    //     res.end();
    // }


    // if (req.method === "POST" && req.url === "/submit") {
    //     let body = ""
    //     req.on("data", (chunk) => {
    //         body += chunk.toString();
    //     })
    //     req.on("end", () => {
    //         const statusCode = 200
    //         res.writeHead(statusCode, { 'content-type': "application/json" });
    //         res.write(JSON.stringify({ "message": "Data received", "data": body }));
    //         res.end();
    //     })
    // }

    // handling query parametres
    // // if (req.method === "GET" && req.url.startsWith('/search')) {
    // //     const queryParams = req.url.split('?')[1];
    // //     console.log(queryParams);
    // //     const username = new URLSearchParams(queryParams).get("username");
    // //     const password = new URLSearchParams(queryParams).get("password");
    // //     res.writeHead(200, { "content-type": "application/json" });
    // //     res.write(JSON.stringify({ username, password }));
    // //     console.log(route);

    // //     res.end();


    // }


    middleWare(req, res, (req, res) => {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const path = parsedUrl.pathname;

        // // Check if the route exists
        if (route[path]) {
            route[path](req, res);
        } else if (path.startsWith('/user/')) {
            const userId = path.split('/')[2];
            route.useRoute(req, res, userId);

        } else {
            route["not-found"](req, res);
        }
    })



});

const PORT = 3000;

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})