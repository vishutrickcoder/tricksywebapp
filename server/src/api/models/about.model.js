import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    content: { type: String, required: true }, // Rich text HTML
    images: [{ type: String }],               // URLs of uploaded images
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
