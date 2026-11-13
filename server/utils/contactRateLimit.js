/**
 * Fixed-window rate limit by IP (in-memory).
 * Good enough for a portfolio contact form on serverless warm instances.
 * Tune via CONTACT_RATE_LIMIT / CONTACT_RATE_WINDOW_MS.
 */
const hits = new Map()

const LIMIT = Number(process.env.CONTACT_RATE_LIMIT || 2)
const WINDOW_MS = Number(process.env.CONTACT_RATE_WINDOW_MS || 30 * 60 * 1000)

function prune(now) {
  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) hits.delete(ip)
  }
}

export function checkContactRateLimit(ip) {
  const key = ip || 'unknown'
  const now = Date.now()

  if (hits.size > 5000) prune(now)

  let entry = hits.get(key)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS }
  }

  entry.count += 1
  hits.set(key, entry)

  const allowed = entry.count <= LIMIT
  const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))

  return {
    allowed,
    limit: LIMIT,
    remaining: Math.max(0, LIMIT - entry.count),
    resetAt: entry.resetAt,
    retryAfterSec
  }
}

export function getClientIp(event) {
  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = getRequestHeader(event, 'x-real-ip')
  if (realIp) return realIp.trim()

  return getRequestIP(event, { xForwardedFor: true }) || 'unknown'
}
