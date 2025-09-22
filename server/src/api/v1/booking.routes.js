// routes/booking.routes.js
import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Customer: create booking
router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json(booking);
});

// Admin: get all bookings
router.get("/", authMiddleware, async (req, res) => {
  const bookings = await Booking.find().populate("service");
  res.json(bookings);
});

// Admin: update booking status
router.put("/:id/status", authMiddleware, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(booking);
});

export default router;
