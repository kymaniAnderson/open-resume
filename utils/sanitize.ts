import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Use this for any user input that will be rendered as HTML
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "u", "p", "br", "span"],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitizes plain text for safe rendering
 * Escapes HTML special characters
 */
export function sanitizeText(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Sanitizes a URL to ensure it's safe
 */
export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }
    return DOMPurify.sanitize(url);
  } catch {
    return "";
  }
}
