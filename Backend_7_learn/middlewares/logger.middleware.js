export const logger = (req, res, next) => {
  const requestMethod = req.method;
  const requestURL = req.url;
  console.log(`[${new Date().toISOString()}] ${requestMethod} ${requestURL}`);
  next();
};
