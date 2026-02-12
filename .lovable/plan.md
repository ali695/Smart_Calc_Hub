

# SEO HTML Meta Tags Plan

## Problem
Two issues prevent optimal Google indexing:

1. **5 key pages have NO SEO meta tags at all**: Index (homepage), About, Blog, FAQ, and Categories pages never call the `SEOHead` component.

2. **`SEOHead` only works via JavaScript**: It uses `useEffect` to inject meta tags into the DOM at runtime. While Googlebot does execute JS, the initial HTML response contains only the generic `index.html` meta tags for every page. This means:
   - Social media crawlers (Facebook, Twitter, LinkedIn) that don't run JS see the wrong title/description
   - Google may deprioritize JS-injected meta tags vs. static HTML tags
   - Page speed/Core Web Vitals are slightly impacted by the extra DOM manipulation

## Solution

### Step 1: Add `SEOHead` to the 5 missing pages

Add the `SEOHead` component with proper title, description, keywords, and canonical URL to:

- **Index.tsx** (homepage) - most critical page
- **About.tsx**
- **Blog.tsx** (blog listing)
- **FAQ.tsx**
- **Categories.tsx**

### Step 2: Install `react-helmet-async` for true HTML `<head>` management

Replace the custom `useEffect`-based `SEOHead` with `react-helmet-async`, which:
- Manages `<head>` tags declaratively via React components
- Works with SSR/pre-rendering if added later
- Is the industry standard for React SPA SEO
- Renders meta tags synchronously during React's render cycle (not deferred to useEffect)

### Step 3: Refactor `SEOHead` component

Rewrite `SEOHead` to use `react-helmet-async`'s `<Helmet>` component instead of manual DOM manipulation. This ensures:
- Title, meta description, OG tags, Twitter cards are set as React elements
- Canonical URLs and hreflang tags are rendered properly
- All existing props/API stay the same (no changes needed in 100+ calculator pages)

### Step 4: Wrap App with `HelmetProvider`

Add `HelmetProvider` at the top level in `App.tsx` so all pages can use Helmet.

---

## Technical Details

### New dependency
- `react-helmet-async` (lightweight, maintained, SSR-ready)

### Files to modify
| File | Change |
|------|--------|
| `src/components/SEOHead.tsx` | Rewrite to use `<Helmet>` instead of `useEffect` DOM manipulation |
| `src/App.tsx` | Wrap with `HelmetProvider` |
| `src/pages/Index.tsx` | Add `SEOHead` with homepage meta tags |
| `src/pages/About.tsx` | Add `SEOHead` with about page meta tags |
| `src/pages/Blog.tsx` | Add `SEOHead` with blog listing meta tags |
| `src/pages/FAQ.tsx` | Add `SEOHead` with FAQ meta tags |
| `src/pages/Categories.tsx` | Add `SEOHead` with categories meta tags |

### No changes needed
- All 100+ calculator pages already pass SEO props through `CalculatorLayout` which calls `SEOHead` -- they will automatically benefit from the refactor.
- All blog post pages, auth, privacy, terms, dashboard, profile pages already use `SEOHead` directly.

### Result
Every page will have proper `<title>`, `<meta>`, OG, and Twitter tags rendered in the HTML `<head>`, visible to all crawlers including those that don't execute JavaScript.

