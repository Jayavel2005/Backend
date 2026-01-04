# Backend Day 02 – MVC Architecture & Express Best Practices 🚀

## 🧠 Concepts Covered (Day 02)

### MVC Architecture

* MVC stands for **Model – View – Controller**
* In backend applications:

  * **Routes** → Define API endpoints (URL + HTTP method)
  * **Controllers** → Handle business logic and responses
  * **Models** → Handle database logic (to be introduced later)

**Why MVC?**

* Clean and readable code
* Easy to scale applications
* Better debugging and testing
* Industry-standard backend structure

---

### Controllers

* Controllers contain **only logic**
* No route definitions or URLs inside controllers
* Each controller handles a single responsibility

**Example Controller**

```js
export const welcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Day 02 Backend Server is upgraded from Day 01 🔥"
  });
};
```

---

### Routing with Express Router

* `express.Router()` is used to create modular routes
* Routes connect URLs to controller functions
* Routes should be thin (no logic inside)

**Example Route File**

```js
import { Router } from "express";
import { welcome } from "../controller/app.controller.js";

const router = Router();
router.get("/", welcome);

export default router;
```

---

### Request Handling in Express

#### 1️⃣ `req.body`

* Used to access data sent in the request body
* Commonly used with POST and PUT requests

```js
export const echo = (req, res) => {
  res.status(201).json({ receivedData: req.body });
};
```

---

#### 2️⃣ `req.params`

* Used to capture dynamic values from the URL

Route:

```
GET /api/user/:id
```

Controller:

```js
export const getId = (req, res) => {
  res.status(200).json({ userId: req.params.id });
};
```

---

#### 3️⃣ `req.query`

* Used for optional query parameters

URL:

```
GET /api/search?keyword=JavaScript
```

Controller:

```js
export const getLanguage = (req, res) => {
  const keyword = req.query.keyword;
  res.status(200).json({ keyword });
};
```

---

### Custom Middleware

* Middleware runs between request and response
* Must call `next()` to continue the request flow

**Logger Middleware Example**

```js
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
```

**Applying Middleware in App**

```js
app.use(logger);
```

---

### Server Bootstrapping

* Server startup logic is separated from app configuration

**server.js**

```js
import { PORT } from "./config/env.js";
import app from "./app.js";

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 📋 Tasks Assigned (Day 02)

1. Refactor Day 01 backend into MVC architecture
2. Move all logic into controllers
3. Create routes using Express Router
4. Implement custom logger middleware
5. Create API using `req.params`
6. Create API using `req.query`
7. Ensure clean and modular project structure

---

## ✅ Task Completion Status

| Task                            | Status      |
| ------------------------------- | ----------- |
| MVC architecture implementation | ✅ Completed |
| Controller creation             | ✅ Completed |
| Router refactoring              | ✅ Completed |
| Logger middleware               | ✅ Completed |
| `req.params` usage              | ✅ Completed |
| `req.query` usage               | ✅ Completed |
| Clean folder structure          | ✅ Completed |

---

## 🏁 Day 02 Summary

* Converted a basic Express server into MVC architecture
* Learned professional backend code organization
* Implemented custom middleware and advanced routing
* Improved backend scalability and maintainability

🔥 **Backend Day 02 successfully completed.**

---

