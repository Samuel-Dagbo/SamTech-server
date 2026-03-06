import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    company: { type: String, default: "" },
    quote: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
