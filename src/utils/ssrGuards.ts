/**
 * SSR Guard Utilities
 * 
 * These utilities help guard client-only code during SSR/pre-rendering.
 * Use these to prevent errors when code runs in a non-browser environment.
 */

/**
 * Check if code is running in a browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if code is running during SSR/pre-rendering
 */
export const isSSR = !isBrowser;

/**
 * Safely access window object
 * Returns undefined during SSR
 */
export const safeWindow = isBrowser ? window : undefined;

/**
 * Safely access document object
 * Returns undefined during SSR
 */
export const safeDocument = isBrowser ? document : undefined;

/**
 * Safely access localStorage
 * Returns a mock object during SSR that does nothing
 */
export const safeLocalStorage = isBrowser 
  ? window.localStorage 
  : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };

/**
 * Safely access sessionStorage
 * Returns a mock object during SSR that does nothing
 */
export const safeSessionStorage = isBrowser 
  ? window.sessionStorage 
  : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };

/**
 * Execute a function only in browser environment
 * @param fn Function to execute
 * @param fallback Optional fallback value for SSR
 */
export function browserOnly<T>(fn: () => T, fallback?: T): T | undefined {
  if (isBrowser) {
    return fn();
  }
  return fallback;
}

/**
 * Get current URL path safely
 * Returns '/' during SSR
 */
export const getCurrentPath = (): string => {
  if (isBrowser) {
    return window.location.pathname;
  }
  return '/';
};

/**
 * Get current URL origin safely
 * Returns empty string during SSR
 */
export const getCurrentOrigin = (): string => {
  if (isBrowser) {
    return window.location.origin;
  }
  return '';
};
