import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    slug: { type: String, default: "", trim: true },
    category: { type: String, default: "" },
    summary: { type: String, default: "" },
    stack: { type: [String], default: [] },
    image: { type: String, default: "" },
    screenshots: { type: [String], default: [] },
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    result: { type: String, default: "" },
    caseStudyBody: { type: String, default: "" },
    metrics: {
      type: [
        {
          label: { type: String, default: "" },
          value: { type: String, default: "" }
        }
      ],
      default: []
    },
    liveUrl: { type: String, default: "" },
    repoUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
