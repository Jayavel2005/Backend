const route = {
    "/": (req, res) => {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/plain" });
        res.write("Hello World!");
        res.end();
    },

    "/about": (req, res) => {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/plain" });
        res.write("About Page!");
        res.end();
    },
    "/contact": (req, res) => {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/plain" });
        res.write("Contact Page!");
        res.end();
    },
    "/search": (req, res) => {
        const queryParam = req.url.split("?")[1];
        const username = new URLSearchParams(queryParam).get("username");
        const password = new URLSearchParams(queryParam).get("password");
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "application/json" });
        res.write(JSON.stringify({ username, password }));
        res.end();
    },
    useRoute: (req, res, userId) => {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "application/json" });
        res.write(JSON.stringify({ userId }));
        res.end();
    },
    "not-found": (req, res) => {
        const statusCode = 404;
        res.writeHead(statusCode, { "content-type": "text/plain" });
        res.write("404 Not Found!");
        res.end();
    }
}

module.exports = route