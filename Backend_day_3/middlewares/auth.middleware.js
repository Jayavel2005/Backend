import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new ApiError(401, "Access Denied, Token Missing");

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    console.log(decoded);
    

    req.user = decoded;
    
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
