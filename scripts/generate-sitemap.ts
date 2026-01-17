/**
 * Static Sitemap Generator for SmartCalc Hub
 * Generates a comprehensive XML sitemap at build time
 * 
 * Usage: npx ts-node scripts/generate-sitemap.ts
 * 
 * This script:
 * - Imports calculator and blog data from source files
 * - Generates a static sitemap.xml with all public pages
 * - Excludes auth, dashboard, profile, and admin routes
 * - Compatible with react-snap SSG and Cloudflare CDN
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Base URL for the production site
const BASE_URL = 'https://smartcalhub.online';

// Current date for lastmod
const CURRENT_DATE = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// ============================================
// STATIC PAGES (manually maintained)
// ============================================
const staticPages: SitemapUrl[] = [
  // Homepage - highest priority
  { loc: `${BASE_URL}/`, lastmod: CURRENT_DATE, changefreq: 'daily', priority: 1.0 },
  
  // Main navigation pages
  { loc: `${BASE_URL}/categories`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: 0.9 },
  { loc: `${BASE_URL}/blog`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: 0.8 },
  { loc: `${BASE_URL}/faq`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/about`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/contact`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: 0.6 },
  
  // Category landing pages
  { loc: `${BASE_URL}/real-estate`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: 0.7 },
  { loc: `${BASE_URL}/crypto`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: 0.7 },
  
  // Legal pages - lowest priority
  { loc: `${BASE_URL}/privacy`, lastmod: CURRENT_DATE, changefreq: 'yearly', priority: 0.3 },
  { loc: `${BASE_URL}/terms`, lastmod: CURRENT_DATE, changefreq: 'yearly', priority: 0.3 },
];

// ============================================
// CALCULATOR PATHS (from src/data/calculators.ts)
// ============================================
const calculatorPaths: string[] = [
  // Health calculators
  '/calculator/bmi',
  '/calculator/bmr',
  '/calculator/calorie',
  '/calculator/ideal-weight',
  '/calculator/body-fat',
  '/calculator/water',
  '/calculator/pregnancy',
  '/calculator/heart-rate',
  '/calculator/macro',
  '/calculator/protein',
  '/calculator/blood-pressure',
  '/calculator/sleep',
  '/calculator/steps',
  '/calculator/basal-temp',
  '/calculator/menstrual',
  '/calculator/tdee',
  '/calculator/calorie-deficit',
  '/calculator/waist-to-height',
  '/calculator/body-surface-area',
  '/calculator/one-rep-max',
  
  // Finance calculators
  '/calculator/loan',
  '/calculator/mortgage',
  '/calculator/compound-interest',
  '/calculator/simple-interest',
  '/calculator/emi',
  '/calculator/tax',
  '/calculator/savings-goal',
  '/calculator/investment-return',
  '/calculator/credit-card',
  '/calculator/car-loan',
  '/calculator/retirement',
  '/calculator/inflation',
  '/calculator/ltv',
  '/calculator/break-even',
  '/calculator/debt-to-income',
  '/calculator/discount',
  '/calculator/net-worth',
  '/calculator/budget-planner',
  '/calculator/salary-after-tax',
  '/calculator/us-income-tax',
  '/calculator/uk-income-tax',
  '/calculator/canada-income-tax',
  '/calculator/australia-income-tax',
  '/calculator/india-income-tax',
  '/calculator/paycheck',
  '/calculator/mortgage-recast',
  '/calculator/refinance',
  '/calculator/401k',
  '/calculator/roth-ira',
  '/calculator/national-insurance',
  '/calculator/stamp-duty',
  '/calculator/social-security',
  '/calculator/sales-tax',
  
  // Math calculators
  '/calculator/percentage',
  '/calculator/percentage-change',
  '/calculator/percentage-increase',
  '/calculator/percentage-decrease',
  '/calculator/fraction',
  '/calculator/fraction-decimal',
  '/calculator/average',
  '/calculator/standard-deviation',
  '/calculator/ratio',
  '/calculator/age',
  '/calculator/quadratic',
  '/calculator/area-perimeter',
  '/calculator/volume',
  '/calculator/prime',
  '/calculator/profit-margin',
  '/calculator/factorial',
  '/calculator/exponent',
  '/calculator/logarithm',
  '/calculator/square-root',
  '/calculator/pythagoras',
  '/calculator/triangle-area',
  '/calculator/circle',
  '/calculator/permutation-combination',
  '/calculator/scientific-notation',
  '/calculator/probability',
  '/calculator/sine',
  '/calculator/cosine',
  '/calculator/tangent',
  '/calculator/arcsin',
  '/calculator/arccos',
  '/calculator/arctan',
  '/calculator/radian-degree',
  
  // Conversion calculators
  '/calculator/length',
  '/calculator/weight',
  '/calculator/temperature',
  '/calculator/currency',
  '/calculator/timezone',
  '/calculator/fuel',
  '/calculator/area-converter',
  '/calculator/speed-converter',
  '/calculator/energy-converter',
  '/calculator/data-transfer',
  '/calculator/pressure-converter',
  '/calculator/roman-numeral',
  '/calculator/days',
  '/calculator/countdown',
  
  // Tech tools
  '/calculator/hash-generator',
  '/calculator/base64-encoder',
  '/calculator/json-formatter',
  '/calculator/password-generator',
  '/calculator/color-converter',
  '/calculator/binary-decimal',
  '/calculator/hex-decimal',
  
  // Engineering calculators
  '/calculator/ohms-law',
  '/calculator/force',
  '/calculator/torque',
  '/calculator/power',
  '/calculator/stress-strain',
  
  // Business calculators
  '/calculator/growth-rate',
  '/calculator/customer-lifetime-value',
  '/calculator/inventory-turnover',
  '/calculator/conversion-rate',
  '/calculator/payback-period',
  
  // Science calculators
  '/calculator/ph',
  '/calculator/molarity-calculator',
  '/calculator/half-life',
  '/calculator/density-calculator',
  '/calculator/kinetic-energy',
  
  // Real Estate calculators
  '/calculator/rent-affordability',
  '/calculator/buy-vs-rent',
  '/calculator/cap-rate',
  '/calculator/property-tax',
  '/calculator/house-flip',
  
  // Crypto calculators
  '/calculator/crypto-profit',
  '/calculator/dca',
  '/calculator/bitcoin-converter',
  '/calculator/mining-profit',
];

// ============================================
// BLOG POST SLUGS (from src/data/blogPosts.ts)
// ============================================
const blogSlugs: string[] = [
  // Original 90 blog posts
  'how-to-calculate-monthly-loan-emi',
  'complete-guide-mortgage-calculator',
  'compound-interest-wealth-building',
  'bmi-calculator-guide-healthy-weight',
  'tax-calculator-guide-2025',
  'retirement-calculator-planning-guide',
  'percentage-calculator-tricks-shortcuts',
  'calorie-calculator-weight-management',
  'currency-converter-forex-trading',
  'age-calculator-life-milestones',
  'investment-return-calculator-roi',
  'unit-converter-guide-measurements',
  'budget-planner-personal-finance',
  'heart-rate-zones-training-guide',
  'macro-calculator-nutrition-guide',
  'quadratic-equation-solver-guide',
  'body-fat-percentage-calculator-guide',
  'savings-goal-calculator-financial-planning',
  'ideal-weight-calculator-health-guide',
  'time-value-money-calculator-guide',
  'scientific-notation-calculator-guide',
  'loan-to-value-calculator-guide',
  'sleep-calculator-optimize-rest',
  'break-even-analysis-calculator-guide',
  'tdee-calculator-complete-guide',
  'steps-to-calories-calculator-guide',
  'net-worth-calculator-wealth-tracking',
  'credit-card-payoff-calculator-guide',
  'pregnancy-due-date-calculator-guide',
  'standard-deviation-calculator-guide',
  'ohms-law-calculator-electronics',
  'water-intake-calculator-hydration',
  'profit-margin-calculator-business',
  'bmi-vs-body-fat-comparison',
  'car-loan-calculator-guide',
  'menstrual-cycle-calculator-guide',
  'debt-to-income-ratio-guide',
  'inflation-calculator-purchasing-power',
  'basal-metabolic-rate-guide',
  'volume-calculator-3d-shapes',
  'blood-pressure-monitor-guide',
  'discount-calculator-shopping-guide',
  'probability-calculator-statistics',
  'password-security-generator-guide',
  'area-perimeter-calculator-geometry',
  'protein-intake-calculator-guide',
  'hash-generator-security-guide',
  'waist-to-height-ratio-guide',
  'one-rep-max-calculator-strength',
  'json-formatter-developer-tool',
  'base64-encoding-guide',
  'binary-decimal-converter-guide',
  'color-converter-hex-rgb-guide',
  'trigonometry-calculator-guide',
  'pythagorean-theorem-calculator',
  'circle-calculator-geometry',
  'factorial-calculator-math',
  'permutation-combination-calculator',
  'logarithm-calculator-guide',
  'ratio-calculator-guide',
  'fraction-calculator-guide',
  'average-calculator-statistics',
  'energy-converter-guide',
  'pressure-converter-engineering',
  'speed-converter-physics',
  'fuel-efficiency-calculator-guide',
  'timezone-converter-guide',
  'roman-numeral-converter-guide',
  'days-between-dates-calculator',
  'countdown-timer-calculator',
  'real-estate-cap-rate-guide',
  'property-tax-calculator-guide',
  'rent-vs-buy-calculator-guide',
  'house-flipping-profit-guide',
  'crypto-profit-calculator-guide',
  'dca-investment-strategy-guide',
  'bitcoin-converter-guide',
  'mining-profitability-guide',
  'us-income-tax-calculator-guide',
  'uk-income-tax-calculator-guide',
  'canada-income-tax-guide',
  'australia-income-tax-guide',
  'india-income-tax-guide',
  'paycheck-calculator-take-home-pay',
  'mortgage-recast-calculator-guide',
  'refinance-calculator-guide',
  '401k-retirement-calculator-guide',
  'roth-ira-calculator-guide',
  'national-insurance-uk-guide',
  'stamp-duty-calculator-uk',
  'social-security-benefits-guide',
  'sales-tax-calculator-us',
  'simple-interest-calculator-guide',
  'growth-rate-cagr-calculator',
  'customer-lifetime-value-guide',
  'inventory-turnover-calculator',
  'conversion-rate-optimization',
  'payback-period-calculator-guide',
  'ph-calculator-chemistry',
  'molarity-calculator-chemistry',
  'half-life-calculator-physics',
  'density-calculator-science',
  'kinetic-energy-calculator-physics',
  'force-calculator-physics',
  'torque-calculator-engineering',
  'power-calculator-engineering',
  'stress-strain-calculator-materials',
  'quadratic-formula-calculator-algebra',
  'credit-score-improvement-guide',
  
  // 30 New SEO-optimized blog posts (added January 2025)
  'stock-market-investing-beginners-guide',
  'emergency-fund-calculator-savings-guide',
  'passive-income-ideas-calculator',
  'debt-payoff-calculator-snowball-avalanche',
  'down-payment-calculator-home-buying',
  'weight-loss-calculator-sustainable-goals',
  'intermittent-fasting-calculator-schedule',
  'running-pace-calculator-training',
  'protein-intake-bodybuilding-calculator',
  'linear-equations-calculator-algebra',
  'statistics-calculator-data-analysis',
  'trigonometry-functions-calculator-guide',
  'electricity-cost-calculator-energy-savings',
  'solar-panel-calculator-energy-production',
  'time-value-money-calculator-pv-fv',
  'npv-irr-calculator-investment-analysis',
  'fuel-economy-calculator-mpg-savings',
  'bac-calculator-alcohol-metabolism',
  'ovulation-fertility-calculator-conception',
  'college-savings-calculator-529-plan',
  'social-security-retirement-calculator',
  'apy-calculator-savings-interest',
  'lease-vs-buy-car-calculator',
  'gpa-calculator-grade-average',
  'tip-calculator-restaurant-service',
  'hourly-to-salary-calculator',
  'rental-property-roi-calculator',
  'home-equity-heloc-calculator',
  'dividend-yield-calculator-income-investing',
  'inflation-impact-calculator-purchasing-power',
  'keto-macros-calculator-ketogenic-diet',
  'retirement-age-planner-calculator',
  'startup-costs-calculator-business',
  'cash-flow-statement-calculator',
  'metric-imperial-conversion-guide',
  'asset-allocation-calculator-portfolio',
  'fire-retirement-calculator-financial-independence',
  'pregnancy-weight-gain-calculator',
  'strength-training-volume-calculator',
  'wedding-budget-calculator-planning',
];

// ============================================
// GENERATE SITEMAP
// ============================================
function generateSitemap(): string {
  const urls: SitemapUrl[] = [];

  // Add static pages
  urls.push(...staticPages);

  // Add calculator pages (high priority - SEO critical)
  calculatorPaths.forEach(path => {
    // Determine priority based on popularity
    const highPriorityCalcs = ['/calculator/bmi', '/calculator/loan', '/calculator/percentage', '/calculator/mortgage'];
    const priority = highPriorityCalcs.includes(path) ? 0.9 : 0.8;
    
    urls.push({
      loc: `${BASE_URL}${path}`,
      lastmod: CURRENT_DATE,
      changefreq: 'monthly',
      priority
    });
  });

  // Add blog posts
  blogSlugs.forEach(slug => {
    urls.push({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: CURRENT_DATE,
      changefreq: 'monthly',
      priority: 0.7
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
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Generate and save sitemap
const sitemap = generateSitemap();
const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');

try {
  writeFileSync(sitemapPath, sitemap, 'utf-8');
  const urlCount = sitemap.split('<url>').length - 1;
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  console.log(`📊 Total URLs: ${urlCount}`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Calculator pages: ${calculatorPaths.length}`);
  console.log(`   - Blog posts: ${blogSlugs.length}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
