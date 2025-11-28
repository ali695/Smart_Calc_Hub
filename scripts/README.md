# Sitemap Generator Scripts

This directory contains scripts for dynamically generating the sitemap.xml file.

## Usage

### Using Node.js (Recommended)

```bash
node scripts/generate-sitemap.js
```

This will:
- Generate a complete sitemap.xml with all calculator pages, blog posts, and main pages
- Include proper lastmod dates (current date)
- Set appropriate priorities and change frequencies
- Save the file to `public/sitemap.xml`

### Using TypeScript

If you prefer to use the TypeScript version:

```bash
npx tsx scripts/generate-sitemap.ts
```

Or compile and run:

```bash
tsc scripts/generate-sitemap.ts
node scripts/generate-sitemap.js
```

## What Gets Generated

The sitemap automatically includes:

1. **Main Pages** (8 pages)
   - Homepage (priority 1.0, daily)
   - Categories, Blog (priority 0.9, weekly)
   - FAQ (priority 0.8, monthly)
   - About, Contact (priority 0.7, monthly)
   - Privacy, Terms (priority 0.5, yearly)

2. **Calculator Pages** (100+ pages)
   - All calculators from finance, health, math, conversion, engineering, business, tech, and science categories
   - High-priority calculators (BMI, Loan, Percentage, Mortgage) get priority 0.9
   - Other calculators get priority 0.8
   - All set to monthly change frequency

3. **Blog Posts** (10+ posts)
   - All blog posts with priority 0.8
   - Monthly change frequency

4. **Category Pages** (8 categories)
   - Finance, Health, Math, Conversion, Tech, Engineering, Business, Science
   - Priority 0.7, weekly updates

## Automated Sitemap Generation

For automatic sitemap generation in your build process, you can add this to your build scripts:

```json
{
  "scripts": {
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "build": "npm run generate-sitemap && vite build"
  }
}
```

## Dynamic Sitemap in Production

The `src/utils/generateSitemap.ts` utility can be used to:
- Generate sitemaps dynamically at runtime
- Integrate with a serverless function for real-time sitemap generation
- Get sitemap statistics

Example usage:
```typescript
import { generateSitemapXML, getSitemapStats } from '@/utils/generateSitemap';

// Generate XML
const sitemapXML = generateSitemapXML();

// Get stats
const stats = getSitemapStats();
console.log(`Total URLs: ${stats.totalUrls}`);
```

## SEO Benefits

Dynamic sitemap generation ensures:
- All pages are discoverable by search engines
- Proper priority and change frequency hints for crawlers
- Up-to-date lastmod dates
- No missing or stale entries
- Automatic updates when new calculators or blog posts are added

## Maintenance

Run this script:
- After adding new calculator pages
- After publishing new blog posts
- Before deploying to production
- Periodically to update lastmod dates

## Validation

Validate your sitemap at:
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Google Search Console
- Bing Webmaster Tools
