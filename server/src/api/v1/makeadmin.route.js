// routes/adminRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", authMiddleware, async (req, res) => {
  const users = await User.find().select("-passwordHash"); // don’t send hash
  res.json(users);
});

// Make user admin
router.put("/make-admin/:id", authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.roles = ["admin"];
  await user.save();

  res.json({ message: `${user.email} is now an admin`, user });
});

export default router;
