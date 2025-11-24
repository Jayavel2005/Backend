import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: `${process.env.SECRET}`, // use uppercase key name
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  }
}));

// In-memory user store (temporary)
const users = [];

// Home route
app.get('/', (req, res) => {
  res.send("Welcome to the Home Page");
});

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Username and password required");
  users.push({ username, password });
  res.status(200).send("Registered Successfully");
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).send("Invalid Credentials");
  req.session.user = user;
  res.status(200).send("Login Successful");
});

// Profile route (protected)
app.get("/profile", (req, res) => {
  if (!req.session.user) return res.status(401).send("Unauthorized");
  res.status(200).send(`Welcome ${req.session.user.username}`);
});

// Logout route (optional)
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Error logging out");
    res.clearCookie("connect.sid");
    res.send("Logged out successfully");
  });
});

// Server start
app.listen(process.env.PORT || 3000, () => console.log(`✅ Server running on port ${process.env.PORT || 3000}`));
  