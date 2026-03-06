import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    copy: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
