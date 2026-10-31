interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window IP store
const ipRequestMap = new Map<string, RateLimitRecord>();

/**
 * Checks if a given IP has exceeded the allowed message quota.
 * Default: Max 3 messages per 5 minutes per IP address.
 */
export function checkRateLimit(
  ip: string,
  limit: number = 3,
  windowMs: number = 5 * 60 * 1000
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  // If no record or current window has expired, reset counter
  if (!record || now > record.resetAt) {
    ipRequestMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  // Quota exceeded
  if (record.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  // Increment within valid window
  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
