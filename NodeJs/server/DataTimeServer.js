const http = require("http");


const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        res.write(`<div>
            <h1>Welcome to Date & Clock Server</h1>
            <a href='/date' > Date </a>
            <a href='/clock' > Clock </a>
        </div>`)
        return res.end();
    } else if (method === 'GET' && url === '/date') {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const date = new Date();
        res.write(date.toLocaleDateString());
        return res.end();
    } else if (method === 'GET' && url === '/clock') {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const date = new Date();
        res.write(date.toLocaleTimeString());
        return res.end();
    } else {
        const statusCode = 404;
        res.writeHead(statusCode, { "content-type": "text/html" });
        res.write(`<h1>404 Not Found</h1>`);
        return res.end();
    }
})
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});