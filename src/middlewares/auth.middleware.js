import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import ApiError from "../utils/apiError.js";

//**Protection for Each user */
export const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    throw new ApiError("Not Authorized", 401);
  }
  const token = header.split(" ")[1];
  const decode = jwt.verify(token, JWT_SECRET);
  if (!decode) throw new ApiError("Invalid token", 401);
  req.user = decode;
  next();
};

//**Protection for admin only */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError("Admin Access only", 403);
  }
  next();
};
