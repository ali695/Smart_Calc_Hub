# Upgrade React to v19 (latest)

Currently on React 18.3.1. Latest stable is React 19.x. This is a major version upgrade.

## What changes

**Dependency bumps:**
- `react`: ^18.3.1 → ^19.2.0
- `react-dom`: ^18.3.1 → ^19.2.0
- `@types/react`: ^18.3.23 → ^19.2.0
- `@types/react-dom`: ^18.3.7 → ^19.2.0

**Compatible with React 19 (no changes needed):**
- All `@radix-ui/*` packages (current versions support React 19)
- `@tanstack/react-query` v5
- `react-router-dom` v6
- `react-hook-form`, `react-helmet-async`, `react-markdown`, `recharts`, `sonner`, `cmdk`, `input-otp`, `vaul`, `next-themes`, `embla-carousel-react`, `lucide-react`
- `react-is` is already at v19

**Needs verification / possible peer-dep override:**
- `react-day-picker@8.10.1` — officially lists React 18 in peer deps. v9 supports React 19 but has a different API. Plan: keep v8 and add `overrides` in package.json to allow React 19, since runtime usage is compatible. (Alternative: upgrade to react-day-picker v9 — would require updating Calendar component API.)
- `react-resizable-panels@2.1.9` — supports React 19 in recent patch versions, should be fine.
- `vaul@0.9.9` — peer dep is React 18. Add to overrides; works fine at runtime. (vaul 1.x supports React 19 but has minor API differences.)

## Approach

1. Update the 4 versions in `package.json`.
2. Add `overrides` block to force React 19 resolution for transitive peer deps:
   ```json
   "overrides": {
     "react": "^19.2.0",
     "react-dom": "^19.2.0"
   }
   ```
3. Let the package install run, then verify the build succeeds.
4. Smoke-test in preview: home page, a calculator page, theme toggle, dialog/sheet (Radix), and the AI chatbot.

## Risk / rollback

- React 19 removes some legacy APIs (`propTypes`, `defaultProps` on function components, string refs, legacy context). A quick scan of the codebase doesn't show usage of these, but if the build breaks I'll fix the specific call sites.
- If `react-day-picker` or `vaul` misbehave at runtime, fallback is to either upgrade them to their React-19-native major versions (small API migration) or pin React back to 18.

## What I will NOT change

- No design changes, no feature changes, no refactors beyond what's required for the upgrade to compile and run.

Approve and I'll apply the upgrade.
