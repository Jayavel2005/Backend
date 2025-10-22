const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        res.write(` <div>
            <h1>Hello World</h1>
            <p>Welcome to home page!</>
            <a href='/contact'>Contact Us</a>
            <a href='/about'>About Us</a>
            
                    </div>`)

        return res.end();
    }
    else if (url === '/about' && method === 'GET') {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        res.write(` <div>
            <h1>About Us</h1>
            <p>We are a team of developers.</p>
            <a href='/'>Home</a>
            <a href='/contact'>Contact Us</a>
            
                    </div>`)
        return res.end();
    }
    else if (url === '/contact' && method === 'GET') {
        const statusCode = 200;
        res.writeHead(statusCode, { 'content-type': 'text/html' });
        res.write(`
        <div>
            <h1>Contact Us</h1>
            <p>Email: info@example.com</p>
            <p>Phone: 123-456-7890</p>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </div>
    `);
        return res.end();
    }
    else {
        const statusCode = 404;
        res.writeHead(statusCode, { 'content-type': 'text/html' });
        res.write(`<h1>404 Not Found</h1>`);
        return res.end();
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})