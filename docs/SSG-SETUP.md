# Static Site Generation (SSG) Setup

This document explains the SSG implementation for SmartCalc Hub using react-snap.

## Overview

The project uses **react-snap** to pre-render all public pages to static HTML at build time. This provides:

- ✅ SEO-friendly HTML that crawlers can index immediately
- ✅ Faster initial page load (no JavaScript required for first paint)
- ✅ Full client-side hydration for interactivity
- ✅ Zero impact on existing functionality

## How It Works

1. **Build Process**: Vite builds the SPA as normal
2. **Pre-rendering**: react-snap uses headless Chrome to visit each route and save the rendered HTML
3. **Deployment**: Static HTML files are deployed to CDN
4. **Hydration**: React hydrates the pre-rendered HTML on the client

## Configuration

### react-snap config (`snap.config.js`)

```javascript
module.exports = {
  source: 'dist',
  include: ['/', '/about', '/categories', ...],
  exclude: ['/auth', '/dashboard', '/profile', '/admin'],
  crawl: true,  // Automatically discover routes via links
};
```

### Routes Pre-rendered

**Static Pages:**
- `/` (Home)
- `/about`
- `/categories`
- `/blog`, `/blog/:slug`
- `/faq`
- `/contact`
- `/privacy`, `/terms`
- `/real-estate`, `/crypto`

**All Calculator Pages:**
- `/calculator/bmi`
- `/calculator/loan`
- ... (130+ calculators)

**Excluded (Auth-protected):**
- `/auth`
- `/dashboard`
- `/profile`
- `/admin`
- `/blog-generator`

## SSR Guards

Client-only code is protected using guards from `src/utils/ssrGuards.ts`:

```typescript
import { isBrowser, safeLocalStorage } from "@/utils/ssrGuards";

// Check if running in browser
if (isBrowser) {
  // Safe to access window, document, localStorage
}

// Safe localStorage access (returns null during SSR)
const value = safeLocalStorage.getItem('key');
```

## Hydration

The app automatically detects pre-rendered HTML and uses hydration:

```typescript
// src/main.tsx
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
```

## What's NOT Changed

- ❌ No Supabase queries during SSR
- ❌ No API calls during SSR
- ❌ No auth logic during SSR
- ❌ No calculator logic during SSR
- ❌ No UI/UX changes
- ❌ No backend impact

All interactive functionality works exactly as before after hydration.

## Running Pre-rendering

After building:

```bash
npm run build
npx react-snap
```

Or add to package.json:

```json
{
  "scripts": {
    "postbuild": "react-snap"
  }
}
```

## Troubleshooting

### Common Issues

1. **Hydration mismatch**: Ensure all client-only code is wrapped in `useEffect` or guarded with `isBrowser`

2. **localStorage errors**: Use `safeLocalStorage` instead of direct `localStorage` access

3. **window/document errors**: Use `safeWindow`/`safeDocument` or check `isBrowser` first

### Debugging

Check if a component is causing SSR issues:

```typescript
import { isBrowser } from "@/utils/ssrGuards";

// Log during render
console.log('Is browser:', isBrowser);
```
