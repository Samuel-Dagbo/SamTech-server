import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, required: true },
    intro: { type: String, required: true },
    heroImage: String,
    contactImage: String,
    resumeUrl: String,
    githubUrl: String,
    linkedinUrl: String,
    xUrl: String,
    aboutTitle: String,
    aboutIntro: String,
    aboutImage: String,
    aboutGallery: { type: [String], default: [] },
    aboutName: String,
    aboutEducation: String,
    aboutJourneyTitle: String,
    aboutJourneyBody: String,
    aboutInspirationTitle: String,
    aboutInspirationBody: String,
    aboutWhoTitle: String,
    aboutWhoBody: String,
    aboutStackTitle: String,
    aboutStackBody: String,
    aboutApproachTitle: String,
    aboutApproachBody: String,
    techStack: { type: [String], default: [] },
    experienceTimeline: {
      type: [
        {
          period: { type: String, default: "" },
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
          description: { type: String, default: "" }
        }
      ],
      default: []
    },
    faqItems: {
      type: [
        {
          question: { type: String, default: "" },
          answer: { type: String, default: "" }
        }
      ],
      default: []
    },
    brands: { type: [String], default: [] },
    location: String,
    yearsExperience: String,
    availability: String,
    whatsapp: String,
    email: String
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
