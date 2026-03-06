import { Router } from "express";
import {
  cleanupProjects,
  createContactMessage,
  createService,
  createProject,
  createTestimonial,
  deleteContactMessage,
  deleteService,
  deleteProject,
  deleteTestimonial,
  getContactMessages,
  getProfile,
  getProjectBySlug,
  getProjects,
  getServices,
  getTestimonials,
  updateContactMessage,
  updateService,
  updateProject,
  updateTestimonial,
  upsertProfile
} from "../controllers/contentController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", getProfile);
router.get("/projects", getProjects);
router.get("/projects/:slug", getProjectBySlug);
router.get("/testimonials", getTestimonials);
router.get("/services", getServices);
router.post("/messages", createContactMessage);
router.post("/cleanup-projects", cleanupProjects);

router.put("/profile", requireAdmin, upsertProfile);
router.get("/messages", requireAdmin, getContactMessages);
router.put("/messages/:id", requireAdmin, updateContactMessage);
router.delete("/messages/:id", requireAdmin, deleteContactMessage);
router.post("/projects", requireAdmin, createProject);
router.put("/projects/:id", requireAdmin, updateProject);
router.delete("/projects/:id", requireAdmin, deleteProject);
router.post("/testimonials", requireAdmin, createTestimonial);
router.put("/testimonials/:id", requireAdmin, updateTestimonial);
router.delete("/testimonials/:id", requireAdmin, deleteTestimonial);
router.post("/services", requireAdmin, createService);
router.put("/services/:id", requireAdmin, updateService);
router.delete("/services/:id", requireAdmin, deleteService);

export default router;
