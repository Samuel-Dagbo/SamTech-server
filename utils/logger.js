import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, "..", "logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, "auth.log");

function formatDate(date) {
  return date.toISOString();
}

export function logAuth(message, data = null) {
  const timestamp = formatDate(new Date());
  let logEntry = `[${timestamp}] ${message}`;
  
  if (data) {
    logEntry += ` | Data: ${JSON.stringify(data)}`;
  }
  
  logEntry += "\n";
  
  fs.appendFileSync(logFile, logEntry);
  console.log(logEntry.trim());
}

export function logError(context, error) {
  const timestamp = formatDate(new Date());
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : "";
  
  const logEntry = `[${timestamp}] ERROR in ${context}: ${errorMessage}\nStack: ${errorStack}\n\n`;
  
  fs.appendFileSync(logFile, logEntry);
  console.error(logEntry.trim());
}

export default { logAuth, logError };

