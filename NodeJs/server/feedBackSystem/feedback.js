// core modules imports
const http = require('http');
const fs = require('fs');

// JSON file path
const filePath = "E:/NodeJS/Backend/NodeJs/server/feedBackSystem/feedback.json";

// Ensure feedback.json exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
}

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method.toUpperCase();

    // --------- HOME PAGE ---------
    if (url === '/' && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to Feedback Website</h1>
            <a href="/getFeedback">Read Feedbacks</a><br>
            <a href="/addFeedback">Add Feedback (POST with Postman or curl)</a>
        `);
    }

    // --------- GET ALL FEEDBACKS ---------
    else if (url === "/getFeedback" && method === "GET") {
        const raw = fs.readFileSync(filePath, "utf-8");
        const feedBackArr = JSON.parse(raw);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(feedBackArr, null, 2));
    }

    // --------- ADD FEEDBACK ---------
    else if (url === '/addFeedback' && method === "POST") {
        const body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();

            // Read file safely
            let raw = fs.readFileSync(filePath, "utf-8");
            if (!raw) raw = "[]";  // fix empty file

            const feedBackArr = JSON.parse(raw);
            feedBackArr.push({ feedback: parsedBody });

            fs.writeFileSync(filePath, JSON.stringify(feedBackArr, null, 2));

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Feedback saved!');
        });

    }

    // --------- 404 NOT FOUND ---------
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

// port number 
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
