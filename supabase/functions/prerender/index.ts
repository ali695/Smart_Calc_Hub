const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'yandex', 'baiduspider', 'facebookexternalhit',
  'twitterbot', 'rogerbot', 'linkedinbot', 'embedly', 'quora link preview',
  'showyoubot', 'outbrain', 'pinterest/0.', 'developers.google.com/+/web/snippet',
  'slackbot', 'vkshare', 'w3c_validator', 'redditbot', 'applebot',
  'whatsapp', 'flipboard', 'tumblr', 'bitlybot', 'skypeuripreview',
  'nuzzel', 'discordbot', 'google page speed', 'qwantify', 'pinterestbot',
  'bitrix link preview', 'xing-contenttabreceiver', 'chrome-lighthouse',
  'telegrambot', 'google-inspectiontool',
];

const IGNORED_EXTENSIONS = [
  '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif',
  '.pdf', '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar',
  '.exe', '.wmv', '.doc', '.avi', '.ppt', '.mpg', '.mpeg', '.tif',
  '.wav', '.mov', '.psd', '.ai', '.xls', '.mp4', '.m4a', '.swf',
  '.dat', '.dmg', '.iso', '.flv', '.m4v', '.torrent', '.ttf',
  '.woff', '.woff2', '.svg', '.webp', '.webm',
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function hasIgnoredExtension(url: string): boolean {
  const pathname = new URL(url).pathname.toLowerCase();
  return IGNORED_EXTENSIONS.some(ext => pathname.endsWith(ext));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    const userAgent = req.headers.get('x-original-user-agent') || '';

    if (!url) {
      return new Response(JSON.stringify({ prerendered: false, reason: 'No URL provided' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Skip non-bot requests and static files
    if (!isBot(userAgent) || hasIgnoredExtension(url)) {
      return new Response(JSON.stringify({ prerendered: false, reason: 'Not a bot or static file' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prerenderUrl = Deno.env.get('PRERENDER_URL');
    if (!prerenderUrl) {
      return new Response(JSON.stringify({ prerendered: false, reason: 'Prerender URL not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch pre-rendered HTML from your self-hosted Prerender server
    const renderUrl = `${prerenderUrl.replace(/\/$/, '')}/render?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(renderUrl, {
      headers: { 'User-Agent': 'Prerender-Proxy/1.0' },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ prerendered: false, reason: `Prerender server returned ${response.status}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = await response.text();

    return new Response(JSON.stringify({ prerendered: true, html }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ prerendered: false, reason: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
