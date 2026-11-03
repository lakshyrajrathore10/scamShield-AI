/**
 * Input and format validators
 */

export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return /^https?:\/\//i.test(url.trim());
  }
}

export function sanitizeText(text) {
  if (!text) return '';
  return String(text).trim();
}

