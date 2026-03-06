import { Router } from "express";
import { createPortalSession } from "../controllers/authController.js";

const router = Router();

router.post("/portal/:slug/session", createPortalSession);

export default router;
