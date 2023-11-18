import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
import Role from "../models/role";

dotenv.config();

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_CODE);
    const userId = decodedToken.id;

    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = user.role.role_name;

    if (userRole !== "admin") {
      return res
        .status(401)
        .json({ message: "Bạn không có quyền truy cập tài nguyên" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};