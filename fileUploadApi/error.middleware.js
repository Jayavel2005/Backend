export const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size exceeds 1MB limit",
    });
  }

  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
