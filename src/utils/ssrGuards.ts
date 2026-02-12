/**
 * Browser Environment Guard Utilities
 * 
 * These utilities help guard client-only code safely.
 */

/** Check if code is running in a browser environment */
export const isBrowser = typeof window !== 'undefined';

/** Check if code is running during SSR (Node / no-window environment) */
export const isSSR = !isBrowser;

/** Safely access window object — undefined during SSR */
export const safeWindow = isBrowser ? window : undefined;

/** Safely access document object — undefined during SSR */
export const safeDocument = isBrowser ? document : undefined;

/** Safely access localStorage — mock during SSR */
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

/** Safely access sessionStorage — mock during SSR */
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

/** Execute a function only in browser environment */
export function browserOnly<T>(fn: () => T, fallback?: T): T | undefined {
  if (isBrowser) {
    return fn();
  }
  return fallback;
}

/** Get current URL path safely — '/' during SSR */
export const getCurrentPath = (): string => {
  if (isBrowser) {
    return window.location.pathname;
  }
  return '/';
};

/** Get current URL origin safely — '' during SSR */
export const getCurrentOrigin = (): string => {
  if (isBrowser) {
    return window.location.origin;
  }
  return '';
};
