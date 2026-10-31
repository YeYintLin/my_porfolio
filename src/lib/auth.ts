const DEFAULT_PASSWORD = "admin123";
const DEFAULT_SECRET = "default-secret-change-in-production";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

function getSessionSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SECRET;
}

// Edge-compatible SHA-256 hash using Web Crypto API
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getExpectedSessionToken(): Promise<string> {
  const input = getAdminPassword() + "_" + getSessionSecret();
  return await sha256(input);
}
