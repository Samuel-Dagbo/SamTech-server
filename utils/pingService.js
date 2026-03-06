/**
 * Ping Service - Keeps the server awake on Render.com
 * Pings immediately on startup and then every 10 minutes
 */

const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

let pingInterval = null;

/**
 * Pings the specified URL
 * @param {string} url - The URL to ping
 * @param {string} label - Label for logging purposes
 */
async function pingUrl(url, label = "ping") {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      // Add a timeout to avoid hanging
      signal: AbortSignal.timeout(10000)
    });
    
    if (response.ok) {
      console.log(`✅ ${label}: Server is awake (status: ${response.status})`);
    } else {
      console.warn(`⚠️ ${label}: Server responded with status ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ ${label}: Failed to ping server -`, error.message);
  }
}

/**
 * Starts the ping service
 * Pings immediately and then every 10 minutes
 * @param {string} serverUrl - The base URL of the server to ping (e.g., https://your-app.onrender.com)
 */
export function startPingService(serverUrl) {
  if (!serverUrl) {
    console.warn("⚠️ Ping service: No server URL provided. Set PING_SERVICE_URL in .env to enable.");
    return;
  }

  const pingTargetUrl = `${serverUrl}/api/health`;

  // Ping immediately on startup
  console.log("🚀 Ping service: Initial ping on startup...");
  pingUrl(pingTargetUrl, "Initial");

  // Set up interval to ping every 10 minutes
  pingInterval = setInterval(() => {
    console.log("⏰ Ping service: Scheduled ping to keep server awake...");
    pingUrl(pingTargetUrl, "Scheduled");
  }, PING_INTERVAL);

  console.log(`✅ Ping service started - will ping every ${PING_INTERVAL / 60000} minutes`);
}

/**
 * Stops the ping service
 * Useful for graceful shutdown
 */
export function stopPingService() {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
    console.log("🛑 Ping service stopped");
  }
}

// Handle graceful shutdown
process.on("SIGTERM", stopPingService);
process.on("SIGINT", stopPingService);

