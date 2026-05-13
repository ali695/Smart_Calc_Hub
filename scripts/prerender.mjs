#!/usr/bin/env node
/**
 * Post-build prerender crawler.
 *
 * After `vite build`, this script:
 *  1. Reads every `<Route path="...">` from src/App.tsx (skipping private routes)
 *  2. Boots a static server on dist/ using sirv
 *  3. Launches headless Chromium and visits every route
 *  4. Writes the fully-rendered HTML to dist/<path>/index.html
 *
 * The result: every public page (including 100+ calculator pages) ships as
 * real HTML on first byte. The SPA still hydrates and works as before.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createServer } from "node:http";
import sirv from "sirv";
import puppeteer from "puppeteer";

const DIST = resolve("dist");
const PORT = 4173;
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY ?? 2);

// Routes that require auth or shouldn't be indexed/prerendered.
const SKIP = new Set([
  "/auth",
  "/dashboard",
  "/profile",
  "/admin",
  "/blog-generator",
  "/blog/:slug", // dynamic — would need DB fetch; left for runtime
  "*",
]);

function extractRoutes() {
  const app = readFileSync(resolve("src/App.tsx"), "utf8");
  const re = /<Route\s+path="([^"]+)"/g;
  const routes = new Set();
  let m;
  while ((m = re.exec(app))) {
    const path = m[1];
    if (SKIP.has(path)) continue;
    if (path.includes(":")) continue; // skip dynamic
    routes.add(path);
  }
  return [...routes];
}

function startServer() {
  // Cache pristine index.html — once we start writing snapshots, we must NOT
  // serve them as the SPA fallback, otherwise later routes hydrate from
  // earlier snapshots and end up with the wrong content.
  const pristineIndex = readFileSync(join(DIST, "index.html"), "utf8");
  const assets = sirv(DIST, { single: false, dev: false, etag: true });
  const server = createServer((req, res) => {
    // Serve real assets (JS/CSS/fonts/images) from disk.
    const isAsset = /\.[a-zA-Z0-9]+(\?|$)/.test(req.url);
    if (isAsset) return assets(req, res);
    // Everything else → pristine index.html (SPA fallback).
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(pristineIndex);
  });
  return new Promise((res) => server.listen(PORT, () => res(server)));
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  // Block analytics / external trackers to speed up + avoid network noise.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (
      url.includes("google-analytics") ||
      url.includes("googletagmanager") ||
      url.includes("doubleclick")
    ) {
      return req.abort();
    }
    req.continue();
  });

  const url = `http://localhost:${PORT}${route}`;
  try {
    const res = await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 45000,
    });
    if (!res || !res.ok()) {
      throw new Error(`HTTP ${res ? res.status() : "no response"} for ${route}`);
    }
    // Give Helmet + late effects a moment to settle.
    await new Promise((r) => setTimeout(r, 400));

    const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

    const outDir = route === "/" ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html, "utf8");
    return { route, ok: true };
  } catch (err) {
    return { route, ok: false, error: err.message };
  } finally {
    await page.close();
  }
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++;
      const r = await worker(items[idx]);
      results.push(r);
      const status = r.ok ? "OK " : "ERR";
      console.log(`  [${status}] ${r.route}${r.error ? "  " + r.error : ""}`);
    }
  });
  await Promise.all(runners);
  return results;
}

(async () => {
  if (!existsSync(DIST)) {
    console.error("dist/ not found — run `vite build` first.");
    process.exit(1);
  }

  const routes = extractRoutes();
  console.log(`\nPrerendering ${routes.length} routes...\n`);

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const start = Date.now();
  const results = await runPool(
    routes,
    (route) => renderRoute(browser, route),
    CONCURRENCY,
  );
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  console.log(
    `\nPrerendered ${results.length - failed.length}/${results.length} routes in ${elapsed}s`,
  );
  if (failed.length) {
    console.error(`\n${failed.length} route(s) failed:`);
    for (const f of failed) console.error(`  - ${f.route}: ${f.error}`);
    process.exit(1);
  }
})();
