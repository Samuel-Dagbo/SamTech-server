import { Router } from "express";
import { createPortalSession } from "../controllers/authController.js";
import Admin from "../Models/Admin.js";

const router = Router();

router.post("/portal/:slug/session", createPortalSession);

// Seed endpoint to create admin user (call once)
router.post("/seed-admin", async (_req, res) => {
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

export default router;
