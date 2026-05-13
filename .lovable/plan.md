# Build-time prerendering for all 150 routes

Goal: every route — including all 100+ calculator pages — gets a real, fully-rendered `index.html` written into `dist/` during `vite build`. Visitors and bots both receive complete HTML on first byte; the app then hydrates into the existing SPA.

## Approach: Puppeteer post-build crawler

After `vite build`, spin up a tiny static server pointing at `dist/`, launch headless Chromium, visit every route, wait for the page to settle, and write the fully-rendered HTML to `dist/<route>/index.html`.

Why this approach over true ReactDOMServer SSG:
- **Zero refactor.** Keeps `BrowserRouter`, `createRoot`, `react-helmet-async`, `useEffect`-based data, Supabase client, all current code as-is.
- **Captures Helmet output** (per-route `<title>`, `<meta>`, JSON-LD) directly into the HTML — fixing the "social crawlers can't see Helmet" limitation.
- **Captures `useEffect` content** like `CalculatorSEOContent`, schema markup blocks, and any client-fetched copy.
- **No risk to 150 existing routes.** Switching to `vite-react-ssg` / `hydrateRoot` would require auditing every page for SSR safety — high risk of regressions.

Trade-off: build is slower (~3–5 min for 150 pages on Lovable's build sandbox) and the build needs Chromium (~170 MB download once, cached). Acceptable for a once-per-publish cost.

## What changes

### New files
1. **`scripts/prerender.mjs`** — the crawler.
   - Starts `sirv dist --single` on `localhost:4173`.
   - Reads route list from a single source of truth (see "Route list" below).
   - Launches Puppeteer, opens each URL, waits for `networkidle0` + a `[data-prerender-ready]` marker (300 ms fallback).
   - Strips dev-only nodes, removes the inline `<script>` that was about to bootstrap React (replaced with the same script — hydration handles the rest).
   - Writes `dist/<path>/index.html` for every route. Root → `dist/index.html` (overwritten).
   - Logs progress; fails the build on any non-2xx page.

2. **`scripts/get-routes.mjs`** — exports the full route list:
   - Static routes: `/`, `/about`, `/contact`, `/faq`, `/blog`, `/categories`, `/privacy`, `/terms`, `/auth`, etc. (excluding admin, dashboard, profile, blog-generator — gated/private).
   - Dynamic calculator routes: imported from `src/data/calculators.ts` (slug → `/calculator/<slug>`) so the list always matches the app.
   - Dynamic blog routes: fetched from Supabase `blog_posts` where `published = true` at build time, mapped to `/blog/<slug>`.

### Modified files
3. **`package.json`**
   - Add deps: `puppeteer`, `sirv`.
   - Add scripts:
     - `"build": "vite build && node scripts/prerender.mjs"` (replaces existing `build`)
     - `"build:fast": "vite build"` (escape hatch — skip prerender for quick iteration)

4. **`src/main.tsx`** — switch `createRoot(...).render(...)` to:
   ```ts
   const el = document.getElementById("root")!;
   if (el.hasChildNodes()) hydrateRoot(el, <App/>);
   else createRoot(el).render(<App/>);
   ```
   Same behavior for the dev server (no prerendered HTML → still uses createRoot), enables hydration in production.

5. **`vite.config.ts`** — no changes needed; output stays in `dist/`.

### Not changed
- `index.html` head, `SEOHead.tsx`, `Layout.tsx`, all 150 page components, sitemap, robots, prerender edge function, Cloudflare worker — all left as-is.

## Routes that should NOT be prerendered

Skip these (still SPA-rendered at runtime, just no static snapshot):
- `/auth`, `/dashboard`, `/profile`, `/admin`, `/admin/*`, `/blog-generator`
- `/*` 404 wildcard
- Any route requiring an authenticated user

## Verification

After implementation I'll:
1. Run `npm run build` and confirm `dist/calculator/bmi/index.html`, `dist/calculator/loan/index.html`, etc. exist.
2. `cat dist/calculator/bmi/index.html | grep -c "About the BMI"` → confirm SEO content body is in the static HTML (not just JS).
3. `grep "<title>" dist/calculator/loan/index.html` → confirm Helmet-injected per-route title is baked in.
4. Hit one prerendered URL with `curl -A "facebookexternalhit"` → confirm full HTML body without JS execution.

## Risks & mitigations

- **Build time / memory.** 150 pages × ~2 s each ≈ 5 min. Mitigated by 4-way concurrency in Puppeteer and `build:fast` escape hatch.
- **Chromium download in Lovable build env.** Add `PUPPETEER_SKIP_DOWNLOAD=false` and rely on Puppeteer's bundled binary; if the build sandbox blocks it, fall back to `@sparticuz/chromium` (lightweight binary that works in serverless envs).
- **Hydration mismatch warnings** from things like `Date.now()` or random IDs. I'll patch the few obvious ones if they appear (the existing `ssrGuards.ts` already covers most of it).
- **Supabase auth state.** Pages that conditionally render based on `useAuth()` will prerender as logged-out — which is correct for first paint and matches what bots/anonymous visitors see.

## What I will NOT do

- No migration to Next.js / TanStack Start / vite-react-ssg.
- No changes to design, content, sitemap, or routing.
- No changes to `supabase/functions/prerender` (the bot edge function) — it stays as a fallback for any route the static crawl misses.

Approve and I'll implement.
