import jwt from "jsonwebtoken";
import Admin from "../Models/Admin.js";
import { logAuth, logError } from "../utils/logger.js";

export async function createPortalSession(req, res) {
  const { slug } = req.params;
  const { username, password } = req.body;

  logAuth("Login attempt", { slug, username, ip: req.ip });

  try {
    // Check if required fields are provided
    if (!username || !password) {
      logAuth("Login failed: Missing credentials", { slug, username: username || "not provided" });
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find admin by secret slug
    const admin = await Admin.findOne({ secretSlug: slug });

    if (!admin) {
      logAuth("Login failed: Admin not found", { slug, username });
      return res.status(404).json({ message: "Admin portal not found" });
    }

    // Check username
    if (username !== admin.username) {
      logAuth("Login failed: Invalid username", { slug, username });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const passwordMatches = await admin.comparePassword(password);
    if (!passwordMatches) {
      logAuth("Login failed: Invalid password", { slug, username });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ role: "admin", id: admin._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
    
    logAuth("Login successful", { slug, username, adminId: admin._id });
    res.json({ token, message: "Session created" });
  } catch (error) {
    logError("createPortalSession", error);
    res.status(500).json({ message: "Server error - please try again later" });
  }
}
