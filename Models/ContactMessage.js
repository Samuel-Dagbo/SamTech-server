
import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    source: { type: String, default: "website" },
    status: { type: String, enum: ["new", "read", "archived"], default: "new" }
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);

