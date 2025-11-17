/**
 * Input sanitization utilities to prevent XSS attacks
 */

/**
 * Sanitize user input to prevent XSS
 * Removes HTML tags and dangerous characters
 */
export function sanitizeInput(input: string | undefined): string | undefined {
  if (!input) return input;

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized;
}

/**
 * Validate and sanitize string with max length
 */
export function validateString(
  input: string | undefined,
  maxLength: number,
  fieldName: string = "Input"
): string | undefined {
  if (!input) return input;

  if (input.length > maxLength) {
    throw new Error(`${fieldName} must be ${maxLength} characters or less`);
  }

  return sanitizeInput(input);
}

/**
 * Validate rating value
 */
export function validateRating(rating: number): number {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5");
  }
  return rating;
}

/**
 * Validate URL format
 */
export function validateUrl(url: string | undefined): string | undefined {
  if (!url) return url;

  try {
    new URL(url);
    return url;
  } catch {
    throw new Error("Invalid URL format");
  }
}
