/**
 * Presentation and string formatters
 */

export function formatDate(isoDateString, options = {}) {
  if (!isoDateString) return '';
  try {
    const date = new Date(isoDateString);
    return date.toLocaleString([], {
      dateStyle: options.dateStyle || 'medium',
      timeStyle: options.timeStyle || 'short',
    });
  } catch {
    return isoDateString;
  }
}

export function truncateText(text, maxLength = 80) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

