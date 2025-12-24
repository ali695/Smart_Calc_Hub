/**
 * react-snap configuration
 * 
 * This config enables static site generation (SSG) for SEO optimization.
 * All public routes are pre-rendered to static HTML at build time.
 */

module.exports = {
  // Source directory (Vite outputs to 'dist')
  source: 'dist',
  
  // Minify HTML output
  minifyHtml: {
    collapseWhitespace: true,
    removeComments: true,
  },
  
  // Puppeteer configuration
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  
  // Skip external links
  skipThirdPartyRequests: true,
  
  // Wait for network idle before capturing
  waitFor: 100,
  
  // Viewport for rendering
  viewport: {
    width: 1440,
    height: 900,
  },
  
  // Routes to include (will be crawled automatically from links)
  include: [
    '/',
    '/about',
    '/categories',
    '/blog',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/real-estate',
    '/crypto',
  ],
  
  // Routes to exclude from pre-rendering (auth-protected)
  exclude: [
    '/auth',
    '/dashboard',
    '/profile',
    '/admin',
    '/blog-generator',
  ],
  
  // Crawl links to discover all routes automatically
  crawl: true,
  
  // Maximum concurrent pages during crawling
  concurrency: 4,
  
  // Save state indicator for hydration
  saveAs: 'html',
  
  // Fix for client-side routing
  fixWebpackChunksIssue: false,
  
  // Add prerendered class for hydration detection
  inlineCss: false,
  
  // Handle JS execution
  headless: true,
  
  // Custom event to wait for before snapshot
  // puppeteerExecutablePath: undefined,
};
