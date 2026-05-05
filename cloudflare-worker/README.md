# Cloudflare Worker — Bot Prerender Proxy for SmartCalc Hub

This Worker sits in front of `smartcalhub.online` and serves pre-rendered HTML to search-engine and social-media crawlers through the Supabase `prerender` Edge Function. Normal users pass through to the live site unchanged.

## Current Supabase project

Use this Supabase project URL in Cloudflare Worker variables:

```txt
SUPABASE_PROJECT_URL=https://taujbrybuglfcbivrjdq.supabase.co
```

Do **not** put your Supabase anon key, Prerender token, or any private secret directly in GitHub.

## How it works

```txt
Crawler request → Cloudflare Worker → Supabase /functions/v1/prerender → Prerender.io → HTML returned to crawler
Human request   → Cloudflare Worker → normal site/origin unchanged
```

The Worker detects bot user agents and skips static assets like JS, CSS, images, fonts, XML, TXT, JSON, and maps.

## Files to add in GitHub

Create this folder in your repo:

```txt
cloudflare-worker/
```

Add these files:

```txt
cloudflare-worker/worker.js
cloudflare-worker/README.md
```

This GitHub folder is for backup/documentation. The Worker only becomes active after you paste/deploy `worker.js` inside Cloudflare and bind the route.

## Supabase setup

In Supabase, your Edge Function URL is:

```txt
https://taujbrybuglfcbivrjdq.supabase.co/functions/v1/prerender
```

In Supabase, go to:

```txt
Project Settings → Edge Functions → Secrets
```

Add these secrets:

```txt
PRERENDER_URL=https://service.prerender.io
PRERENDER_TOKEN=your_prerender_io_token
```

Keep the Prerender token secret. Do not commit it to GitHub.

## Cloudflare Worker setup

Go to:

```txt
Cloudflare → Workers & Pages → Create Worker
```

Paste the content of `worker.js`.

Then go to:

```txt
Worker → Settings → Variables
```

Add these Worker variables:

```txt
SUPABASE_PROJECT_URL=https://taujbrybuglfcbivrjdq.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
```

Do not use the Supabase `service_role` key.

## Route binding

Go to:

```txt
Worker → Triggers → Routes → Add route
```

Add:

```txt
smartcalhub.online/*
```

Choose this Worker and save.

## Test

From Windows terminal, test crawler response:

```powershell
curl.exe -A "Googlebot/2.1" -I https://smartcalhub.online/
```

A successful prerendered response should include:

```txt
X-Prerendered: true
Content-Type: text/html; charset=utf-8
```

Test normal user response:

```powershell
curl.exe -A "Mozilla/5.0" -I https://smartcalhub.online/
```

Normal user response should not include `X-Prerendered: true`.

## Important SEO note

This setup should only return the same visible content that users can access normally. It is meant to help crawlers read JavaScript-rendered pages, not to show different hidden content to Google.
