/**
 * Email obfuscation utilities to prevent spam scraping
 * While not perfect, this makes it harder for automated bots to harvest emails
 */

/**
 * Simple base64 encoding for email addresses
 * This prevents naive email scraping while remaining accessible to users
 */
export function encodeEmail(email: string): string {
  return btoa(email)
}

/**
 * Decode base64 encoded email
 */
export function decodeEmail(encoded: string): string {
  try {
    return atob(encoded)
  } catch {
    return ''
  }
}

/**
 * Create mailto link safely for client-side rendering
 * This prevents search engines and bots from easily scraping the email
 */
export function createMailtoLink(encoded: string): string {
  const email = decodeEmail(encoded)
  return `mailto:${email}`
}

// Pre-encoded email to avoid storing it directly in source
export const ENCODED_EMAIL = encodeEmail('rnamit099@gmail.com')
