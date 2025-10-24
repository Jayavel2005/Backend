const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const filePath = path.join(__dirname, "polls.json");

// Initial data structure for polls
const initialPolls = [{
  "Java":    { "title": "Java", "count": 0 },
  "Python":  { "title": "Python", "count": 0 },
  "C++":     { "title": "C++", "count": 0 },
  "JavaScript": { "title": "JavaScript", "count": 0 }
}];

// Ensure polls.json exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify(initialPolls, null, 2), "utf8");
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Helper to read current poll data
  function readPollData() {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  }

  // Helper to write updated poll data
  function writePollData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }

  // GET Home - show form, dynamic list
  if (url === "/" && method === "GET") {
    const polls = readPollData()[0];
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`
      <div style="max-width:450px;margin:60px auto;padding:30px;border-radius:16px;text-align:center;background: linear-gradient(135deg,#ffffff,#eaf6ff);box-shadow:0 6px 16px rgba(0,0,0,0.15);font-family:'Segoe UI',sans-serif;">
        <h1 style="color:#1e3d59;font-size:32px;margin-bottom:25px;">Poll App</h1>
        <div style="margin-bottom:25px;">
          <h2 style="color:#34495e;font-size:20px;margin-bottom:15px;">Which is your favourite programming language?</h2>
          <form action="/vote" method="POST" style="margin-bottom:15px;">
            <ul style="list-style-type:none;padding:0;margin:0;">
              ${Object.keys(polls).map(lang => `
                <li style="background-color:#f0f4f8;margin:8px 0;padding:10px;border-radius:8px;font-size:16px;color:#2c3e50;">
                  <label>
                    <input type="radio" name="language" value="${lang}" required> ${lang}
                  </label>
                </li>`).join("")}
            </ul>
            <button type="submit" style="padding:10px 30px;background:#2ecc71;color:white;border:none;border-radius:8px;cursor:pointer;transition:0.3s;">Vote</button>
          </form>
          <form action="/addPoll" method="POST">
            <input type="text" name="language" placeholder="Enter a new language..." 
              style="padding:12px;width:85%;border:2px solid #3498db;border-radius:8px;font-size:16px;outline:none;margin-bottom:15px;">
            <button type="submit" style="padding:12px 30px;background:#3498db;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer;transition:0.3s;">Add Poll</button>
          </form>
        </div>
        <a href="/viewPoll" style="display:inline-block;margin-top:10px;background:#2980b9;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;">View Poll Results</a>
      </div>
    `);
    res.end();
  }

  // POST /vote to increment count for chosen language
  else if (url === "/vote" && method === "POST") {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const parsed = querystring.parse(Buffer.concat(body).toString());
      const language = parsed.language;
      if (language) {
        const data = readPollData();
        if (data[0][language]) {
          data[0][language].count += 1;
          writePollData(data);
        }
      }
      // Redirect to view poll results
      res.writeHead(303, { Location: "/viewPoll" });
      res.end();
    });
  }

  // POST /addPoll to add a new language
  else if (url === "/addPoll" && method === "POST") {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const parsed = querystring.parse(Buffer.concat(body).toString());
      const language = parsed.language && parsed.language.trim();
      if (language) {
        const data = readPollData();
        if (!data[0][language]) {  // Add new if not exist
          data[0][language] = { title: language, count: 0 };
          writePollData(data);
        }
      }
    //   res.writeHead(303, { Location: "/" });
      res.end();
    });
  }

  // GET /viewPoll to display poll results
  else if (url === "/viewPoll" && method === "GET") {
    const polls = readPollData()[0];
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`
      <div style="max-width:400px;margin:60px auto;padding:30px;border-radius:16px;text-align:center;background:#fff2;margin-bottom:20px;">
        <h2>Poll Results</h2>
        <ul style="list-style:none;padding:0;">
          ${Object.keys(polls).map(lang =>
            `<li style="margin:10px 0;font-size:18px;">
              <strong>${lang}:</strong> ${polls[lang].count}
            </li>`
          ).join("")}
        </ul>
        <a href="/" style="text-decoration:none;color:#1e3d59;">Back to Poll</a>
      </div>
    `);
    res.end();
  }

  else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
