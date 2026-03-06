import jwt from "jsonwebtoken";
import Admin from "../Models/Admin.js";

export async function createPortalSession(req, res) {
  const { slug } = req.params;
  const { username, password } = req.body;

  try {
    // Find admin by secret slug
    const admin = await Admin.findOne({ secretSlug: slug });

    if (!admin) {
      return res.status(404).json({ message: "Not found" });
    }

    // Check username
    if (username !== admin.username) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const passwordMatches = await admin.comparePassword(password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, message: "Session created" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
