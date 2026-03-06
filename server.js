import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import { startPingService } from "./utils/pingService.js";
import Admin from "./Models/Admin.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ message: "SamTech portfolio API is running" });
});

// Seed endpoint to create admin user (call once)
app.post("/api/seed-admin", async (_req, res) => {
  try {
    await Admin.deleteMany({});
    await Admin.create({
      username: "samtech-admin",
      password: "samtech_ticotico",
      secretSlug: "samtech",
      role: "admin"
    });
    res.json({ message: "Admin user created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/api", authRoutes);
app.use("/api/content", contentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      
      // Start ping service to keep server awake on Render
      const pingUrl = process.env.PING_SERVICE_URL;
      if (pingUrl) {
        startPingService(pingUrl);
      }
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error.message);
    process.exit(1);
  });
