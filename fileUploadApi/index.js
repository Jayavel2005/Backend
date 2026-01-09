import express from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.post("/image", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "file uploaded" });
});

app.post("/images", upload.array("images", 10), (req, res) => {
  res.status(200).json({ message: "files uploaded" });
});
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
