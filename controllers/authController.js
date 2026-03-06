import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function envReady() {
  return [
    process.env.ADMIN_SECRET_SLUG,
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD,
    process.env.JWT_SECRET
  ].every(Boolean);
}

export async function createPortalSession(req, res) {
  if (!envReady()) {
    return res.status(500).json({ message: "Admin environment variables are not configured." });
  }

  if (req.params.slug !== process.env.ADMIN_SECRET_SLUG) {
    return res.status(404).json({ message: "Not found" });
  }

  const { username, password } = req.body;
  const usernameMatches = username === process.env.ADMIN_USERNAME;

  const storedPassword = process.env.ADMIN_PASSWORD;
  const passwordMatches = storedPassword.startsWith("$2")
    ? await bcrypt.compare(password, storedPassword)
    : password === storedPassword;

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token, message: "Session created" });
}
