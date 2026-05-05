/**
 * SmartCalc Hub — Cloudflare Worker (Prerender proxy)
 *
 * Detects bot user-agents and serves pre-rendered HTML from the
 * Supabase `prerender` Edge Function. Humans pass through to origin.
 *
 * Required Cloudflare Worker variables / secrets:
 *   SUPABASE_PROJECT_URL  = https://taujbrybuglfcbivrjdq.supabase.co
 *   SUPABASE_ANON_KEY     = your Supabase anon / publishable key
 *
 * IMPORTANT:
 * - Do NOT hardcode SUPABASE_ANON_KEY in this file.
 * - Add SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY inside Cloudflare Worker variables.
 */

const BOT_UA = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|applebot|duckduckbot|pinterest|redditbot|embedly|quora link preview|chrome-lighthouse|google-inspectiontool|gptbot|chatgpt-user|claude-web|anthropic-ai|perplexitybot|youbot|cohere-ai/i;

const SKIP_EXT = /\.(js|mjs|css|xml|png|jpe?g|gif|pdf|ico|zip|mp[34]|m4a|woff2?|ttf|otf|svg|webp|webm|mov|avi|txt|json|map)$/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const ua = request.headers.get('user-agent') || '';
    const isBot = BOT_UA.test(ua) && !SKIP_EXT.test(url.pathname);

    if (isBot && env.SUPABASE_PROJECT_URL && env.SUPABASE_ANON_KEY) {
      try {
        const prerenderEndpoint =
          `${env.SUPABASE_PROJECT_URL.replace(/\/$/, '')}/functions/v1/prerender` +
          `?url=${encodeURIComponent(request.url)}`;

        const r = await fetch(prerenderEndpoint, {
          method: 'GET',
          headers: {
            'x-original-user-agent': ua,
            'apikey': env.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
          },
          // Cloudflare cache: cache bot HTML responses for one hour.
          cf: { cacheTtl: 3600, cacheEverything: true },
        });

        if (r.status === 200) {
          const html = await r.text();

          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'X-Prerendered': 'true',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
        // Any non-200 response, including 204, falls through to origin.
      } catch (err) {
        // Never break a bot/user request if prerender fails.
        console.error('Prerender fetch failed:', err);
      }
    }

    // Humans and skipped assets pass through to your normal origin.
    return fetch(request);
  },
};
