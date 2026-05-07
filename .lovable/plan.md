# Complete Project Archive (Full, Nothing Excluded) — Plan

## Goal
Create a single ZIP containing the **entire** project as-is, including `node_modules/` and `.git/`, so it can be unzipped and run immediately without any install step.

## What will be included

Everything in the project root, with no exclusions:

| Item | Size | Notes |
|---|---|---|
| `src/` | 2.2 MB | All source code |
| `public/` | 18 MB | All static assets (favicons, blog images, sitemap) |
| `supabase/` | 67 KB | Edge functions + config |
| `cloudflare-worker/` | 5.5 KB | Prerender proxy worker |
| `scripts/` | 25 KB | Sitemap generation scripts |
| `node_modules/` | 359 MB | All installed dependencies (included as requested) |
| `.git/` | 512 KB | Full git history |
| `.lovable/`, `.workspace/` | small | Internal editor metadata |
| `index.html`, `package.json`, `bun.lock`, `package-lock.json` | — | Entry + dependency lockfiles |
| `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js` | — | Build config |
| `tsconfig*.json`, `eslint.config.js`, `components.json` | — | Tooling config |
| `README.md`, `.gitignore`, `.env` | — | Docs + env (contains public Supabase anon key) |

**Estimated final ZIP size: ~150–200 MB** (compressed from ~380 MB; `node_modules` compresses heavily).

## Steps

1. **Create ZIP** of the entire `/dev-server` directory with no excludes.
2. **Write to** `/mnt/documents/smartcalc-hub-full.zip`.
3. **Verify** — check file count, total size, and that `node_modules/`, `.git/`, `src/`, `public/` are all present.
4. **Deliver** as a downloadable artifact.

## Notes / Warnings

- **Large file**: ~150–200 MB download. Browsers and email may struggle.
- **Platform-specific binaries**: `node_modules` contains native binaries (esbuild, swc, rollup) compiled for the current Linux x64 sandbox. If the user unzips on Windows or macOS, they will need to delete `node_modules` and run `bun install` (or `npm install`) anyway. Including it only saves time on a Linux x64 machine.
- **`.env` included**: contains the `VITE_SUPABASE_PUBLISHABLE_KEY` (public anon key — safe). No private keys are stored in `.env`.
- **`.git/` included**: full version history is preserved.

## After download

```bash
unzip smartcalc-hub-full.zip -d smartcalc-hub
cd smartcalc-hub
bun dev   # or: npm run dev
# If you get binary errors on a non-Linux-x64 machine:
rm -rf node_modules && bun install && bun dev
```
