import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("Username and password required");
  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(200).send("Registered Successfully");
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send("Invalid Credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid Credentials");

  const token = jwt.sign({ username }, "test#secret", { expiresIn: "1h" });
  res.json({ token });
});

// Profile route (protected)
app.get("/profile", (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "test#secret");
    res.status(200).send(`Welcome ${decoded.username}`);
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

// Logout route
app.post("/logout", (req, res) => {
  res.send("Logout successful (discard your JWT)");
});

// Start server
app.listen(process.env.PORT || 3000, () =>
  console.log(`✅ Server running on port ${process.env.PORT || 3000}`)
);
