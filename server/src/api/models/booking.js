// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: String,
  phone: String,
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  date: Date,
  time: String,
  address: String,
  notes: String,
  status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" },
});

export default mongoose.model("Booking", bookingSchema);
