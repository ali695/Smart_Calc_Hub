// Input sanitization utilities for security

/**
 * Sanitizes HTML by removing dangerous tags and attributes
 * Use this before displaying user-generated content
 */
export const sanitizeHTML = (input: string): string => {
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '');
  
  return sanitized;
};

/**
 * Sanitizes string input for safe display
 * Removes < > characters to prevent HTML injection
 */
export const sanitizeString = (input: string, maxLength: number = 500): string => {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, maxLength); // Limit length
};

/**
 * Validates and sanitizes URL input
 * Only allows http:// and https:// protocols
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '';
    }
    
    return parsed.href;
  } catch {
    // Invalid URL, return empty string
    return '';
  }
};

/**
 * Sanitizes email address
 * Basic validation and sanitization
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const trimmed = email.trim().toLowerCase();
  
  if (!emailRegex.test(trimmed)) {
    return '';
  }
  
  // Limit length
  return trimmed.slice(0, 255);
};

/**
 * Sanitizes numeric input
 * Ensures it's a valid, finite number within bounds
 */
export const sanitizeNumber = (
  input: string | number,
  options: { min?: number; max?: number } = {}
): number | null => {
  const { min = -Infinity, max = Infinity } = options;
  
  const num = typeof input === 'string' ? parseFloat(input) : input;
  
  if (isNaN(num) || !isFinite(num)) {
    return null;
  }
  
  if (num < min || num > max) {
    return null;
  }
  
  return num;
};

/**
 * Content Security Policy helper
 * Generates CSP header string
 */
export const getCSPHeader = (): string => {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
};
