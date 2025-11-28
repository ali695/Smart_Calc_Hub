import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Import calculator and blog post data
const calculators = [
  // This will be dynamically populated from the data files
  // For now, we'll generate it programmatically
];

const blogPosts = [
  // This will be dynamically populated from the data files
];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://smartcalchub.com';

const generateSitemap = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [];

  // Main pages
  urls.push(
    { loc: `${BASE_URL}/`, lastmod: currentDate, changefreq: 'daily', priority: 1.0 },
    { loc: `${BASE_URL}/categories`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { loc: `${BASE_URL}/blog`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { loc: `${BASE_URL}/faq`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { loc: `${BASE_URL}/about`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${BASE_URL}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${BASE_URL}/privacy`, lastmod: currentDate, changefreq: 'yearly', priority: 0.5 },
    { loc: `${BASE_URL}/terms`, lastmod: currentDate, changefreq: 'yearly', priority: 0.5 }
  );

  // Calculator pages - these would be dynamically loaded from calculators.ts
  const calculatorPaths = [
    '/calculator/bmi', '/calculator/loan', '/calculator/percentage', '/calculator/length',
    '/calculator/mortgage', '/calculator/bmr', '/calculator/calorie', '/calculator/ideal-weight',
    '/calculator/body-fat', '/calculator/water', '/calculator/pregnancy', '/calculator/heart-rate',
    '/calculator/macro', '/calculator/protein', '/calculator/weight', '/calculator/temperature',
    '/calculator/average', '/calculator/ratio', '/calculator/fraction', '/calculator/age',
    '/calculator/compound-interest', '/calculator/tax', '/calculator/savings-goal', '/calculator/investment-return',
    '/calculator/currency', '/calculator/credit-card', '/calculator/car-loan', '/calculator/retirement',
    '/calculator/inflation', '/calculator/ltv', '/calculator/break-even', '/calculator/debt-to-income',
    '/calculator/blood-pressure', '/calculator/sleep', '/calculator/steps', '/calculator/basal-temp',
    '/calculator/menstrual', '/calculator/quadratic', '/calculator/percentage-change', '/calculator/area-perimeter',
    '/calculator/volume', '/calculator/prime', '/calculator/profit-margin', '/calculator/emi',
    '/calculator/discount', '/calculator/salary-after-tax', '/calculator/net-worth', '/calculator/tdee',
    '/calculator/calorie-deficit', '/calculator/body-surface-area', '/calculator/waist-to-height',
    '/calculator/budget-planner', '/calculator/sine', '/calculator/cosine', '/calculator/tangent',
    '/calculator/arcsin', '/calculator/arccos', '/calculator/arctan', '/calculator/radian-degree',
    '/calculator/area', '/calculator/speed', '/calculator/pressure', '/calculator/energy',
    '/calculator/data-transfer', '/calculator/timezone', '/calculator/power', '/calculator/ohms-law',
    '/calculator/force', '/calculator/torque', '/calculator/density', '/calculator/kinetic-energy',
    '/calculator/stress-strain', '/calculator/pythagoras', '/calculator/triangle-area', '/calculator/circle',
    '/calculator/exponent', '/calculator/logarithm', '/calculator/factorial', '/calculator/permutation-combination',
    '/calculator/scientific-notation', '/calculator/square-root', '/calculator/fuel-efficiency',
    '/calculator/growth-rate', '/calculator/conversion-rate', '/calculator/customer-lifetime-value',
    '/calculator/inventory-turnover', '/calculator/payback-period', '/calculator/break-even-analysis',
    '/calculator/ph', '/calculator/molarity', '/calculator/half-life', '/calculator/password-generator',
    '/calculator/hash-generator', '/calculator/base64-encoder', '/calculator/json-formatter',
    '/calculator/color-converter'
  ];

  calculatorPaths.forEach(path => {
    urls.push({
      loc: `${BASE_URL}${path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: path.includes('/bmi') || path.includes('/loan') || path.includes('/percentage') ? 0.9 : 0.8
    });
  });

  // Blog posts
  const blogSlugs = [
    'how-to-calculate-monthly-loan-emi',
    'health-metrics-tracking-guide',
    'advanced-percentage-calculations-tricks',
    'currency-conversion-guide-2025',
    'bmr-vs-bmi-explained',
    'top-financial-calculators-small-business',
    'compound-interest-wealth-building',
    'mortgage-calculator-home-buying-guide',
    'bmi-calculator-complete-guide',
    'scientific-calculator-guide-engineers'
  ];

  blogSlugs.forEach((slug, index) => {
    urls.push({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    });
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Generate and save sitemap
const sitemap = generateSitemap();
const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');

try {
  writeFileSync(sitemapPath, sitemap, 'utf-8');
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  console.log(`📊 Total URLs: ${sitemap.split('<url>').length - 1}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
