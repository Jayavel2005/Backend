# Backend Day 01 – Node.js & Express Fundamentals 🚀

## 🧠 Concepts Covered (Day 01)

### Backend Basics

- What backend development is and its role in an application
- Client → Server → Database → Response flow
- REST API fundamentals

### Node.js & Express

- Setting up a Node.js project from scratch
- Creating an Express server
- Understanding middleware and request lifecycle
- Handling HTTP methods (GET, POST)
- Working with `req` and `res` objects

### Routing

- Creating routes using `express.Router()`
- Route prefixing using `/api`
- Organizing routes in a separate file

### Environment Configuration

- Using `dotenv` to manage environment variables
- Separating configuration logic using `env.js`
- Running the server on a configurable port

### Project Structure

- Separating server startup and app configuration
- Modularizing routes and configuration files
- Writing clean, maintainable backend code

---

## 📋 Tasks Assigned (Day 01)

1. Set up Node.js and initialize a backend project
2. Install and configure Express
3. Create a basic Express server
4. Configure middleware for JSON parsing
5. Create REST APIs:
   - Health Check API
   - Echo API
   - Time API
6. Use environment variables for configuration
7. Structure the project using multiple files

---

## ✅ Task Completion Status

| Task                             | Status       |
| -------------------------------- | ------------ |
| Node.js project setup            | ✅ Completed |
| Express installation & setup     | ✅ Completed |
| Express server creation          | ✅ Completed |
| Middleware configuration         | ✅ Completed |
| Health Check API                 | ✅ Completed |
| Echo API                         | ✅ Completed |
| Time API                         | ✅ Completed |
| Environment variables (`dotenv`) | ✅ Completed |
| Modular project structure        | ✅ Completed |

---

## 🧪 Example Code Snippets (For Revision)

### 1️⃣ Creating an Express Server (`app.js`)

```js
import express from "express";
import appRouter from "./routes.js";

const app = express();

app.use(express.json());
app.use("/api", appRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to my backend server 01 🔥"
  });
});

export default app;
```
```js
2️⃣ Starting the Server (server.js)
js
Copy code
import { PORT } from "./env.js";
import app from "./app.js";

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

```

```js
3️⃣ Environment Configuration (env.js)
js
Copy code
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

```
```
#.env

PORT=5000

```

```js
4️⃣ Creating Routes Using Router (routes.js)

import { Router } from "express";

const appRouter = Router();

appRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy ✌️"
  });
});

appRouter.post("/echo", (req, res) => {
  const { name, role } = req.body;

  res.status(201).json({
    receivedData: { name, role }
  });
});

appRouter.get("/time", (req, res) => {
  res.status(200).json({
    currentTime: new Date().toISOString()
  });
});

export default appRouter;

```

```js
5️⃣ Request & Response Basics
js

// req.body  -> data sent from client
// res.json  -> send JSON response
app.post("/example", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received" });
});
```
