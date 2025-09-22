// models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number, // optional
});

export default mongoose.model("Service", serviceSchema);
