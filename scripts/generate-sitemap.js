const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://smartcalhub.online';

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [];

  // Main pages
  urls.push(
    { loc: `${BASE_URL}/`, lastmod: currentDate, changefreq: 'daily', priority: 1.0 },
    { loc: `${BASE_URL}/categories`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { loc: `${BASE_URL}/blog`, lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { loc: `${BASE_URL}/faq`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { loc: `${BASE_URL}/about`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${BASE_URL}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 },
    { loc: `${BASE_URL}/privacy`, lastmod: currentDate, changefreq: 'yearly', priority: 0.5 },
    { loc: `${BASE_URL}/terms`, lastmod: currentDate, changefreq: 'yearly', priority: 0.5 },
    { loc: `${BASE_URL}/real-estate`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/crypto`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/dashboard`, lastmod: currentDate, changefreq: 'monthly', priority: 0.6 }
  );

  // All calculator pages - complete list synced with src/data/calculators.ts
  const calculatorPaths = [
    // Finance Calculators
    '/calculator/loan', '/calculator/mortgage', '/calculator/emi', '/calculator/compound-interest',
    '/calculator/simple-interest', '/calculator/investment-return', '/calculator/retirement',
    '/calculator/savings-goal', '/calculator/car-loan', '/calculator/budget-planner',
    '/calculator/tax', '/calculator/salary-after-tax', '/calculator/discount',
    '/calculator/inflation', '/calculator/credit-card', '/calculator/net-worth',
    '/calculator/debt-to-income', '/calculator/ltv', '/calculator/break-even', '/calculator/currency',
    '/calculator/us-income-tax', '/calculator/uk-income-tax', '/calculator/canada-income-tax',
    '/calculator/australia-income-tax', '/calculator/india-income-tax', '/calculator/paycheck',
    '/calculator/mortgage-recast', '/calculator/refinance', '/calculator/401k', '/calculator/roth-ira',
    '/calculator/national-insurance', '/calculator/stamp-duty', '/calculator/social-security',
    
    // Health Calculators
    '/calculator/bmi', '/calculator/bmr', '/calculator/calorie', '/calculator/tdee',
    '/calculator/macro', '/calculator/ideal-weight', '/calculator/body-fat', '/calculator/protein',
    '/calculator/water', '/calculator/calorie-deficit', '/calculator/heart-rate',
    '/calculator/blood-pressure', '/calculator/body-surface-area', '/calculator/waist-to-height',
    '/calculator/pregnancy', '/calculator/menstrual', '/calculator/basal-temp', '/calculator/steps',
    '/calculator/sleep', '/calculator/one-rep-max',
    
    // Math Calculators
    '/calculator/percentage', '/calculator/percentage-change', '/calculator/percentage-increase',
    '/calculator/percentage-decrease', '/calculator/fraction', '/calculator/fraction-decimal',
    '/calculator/average', '/calculator/standard-deviation', '/calculator/quadratic',
    '/calculator/pythagoras', '/calculator/triangle-area', '/calculator/circle', '/calculator/volume',
    '/calculator/area-perimeter', '/calculator/exponent', '/calculator/logarithm',
    '/calculator/factorial', '/calculator/permutation-combination', '/calculator/scientific-notation',
    '/calculator/ratio', '/calculator/probability', '/calculator/prime-number', '/calculator/square-root',
    '/calculator/sine', '/calculator/cosine', '/calculator/tangent',
    '/calculator/arcsin', '/calculator/arccos', '/calculator/arctan', '/calculator/radian-degree',
    
    // Conversion Calculators
    '/calculator/length', '/calculator/weight', '/calculator/temperature', '/calculator/area',
    '/calculator/speed', '/calculator/energy', '/calculator/pressure', '/calculator/fuel-efficiency',
    '/calculator/age', '/calculator/days', '/calculator/countdown', '/calculator/timezone',
    '/calculator/data-transfer', '/calculator/binary-decimal', '/calculator/hex-decimal',
    '/calculator/roman-numeral',
    
    // Tech Tools
    '/calculator/base64', '/calculator/json-formatter', '/calculator/hash-generator',
    '/calculator/password-generator', '/calculator/color-converter',
    
    // Engineering
    '/calculator/ohms-law', '/calculator/power', '/calculator/force', '/calculator/torque',
    '/calculator/kinetic-energy', '/calculator/density', '/calculator/stress-strain',
    
    // Business
    '/calculator/profit-margin', '/calculator/growth-rate', '/calculator/conversion-rate',
    '/calculator/payback-period', '/calculator/inventory-turnover', '/calculator/sales-tax',
    '/calculator/customer-lifetime-value',
    
    // Science
    '/calculator/ph', '/calculator/molarity', '/calculator/half-life',
    
    // Real Estate
    '/calculator/rent-affordability', '/calculator/buy-vs-rent', '/calculator/cap-rate',
    '/calculator/property-tax', '/calculator/house-flip',
    
    // Crypto
    '/calculator/crypto-profit', '/calculator/dca', '/calculator/bitcoin', '/calculator/mining-profit'
  ];

  const highPriorityPaths = ['/calculator/bmi', '/calculator/loan', '/calculator/percentage', '/calculator/mortgage', '/calculator/length'];
  calculatorPaths.forEach(path => {
    urls.push({
      loc: `${BASE_URL}${path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: highPriorityPaths.includes(path) ? 0.9 : 0.8
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
    'scientific-calculator-guide-engineers',
    'retirement-planning-calculator-guide',
    'crypto-profit-calculator-guide',
    'real-estate-investment-calculator-guide',
    'tax-planning-calculator-tips',
    'business-metrics-calculator-guide'
  ];

  blogSlugs.forEach(slug => {
    urls.push({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    });
  });

  // Category pages
  const categories = ['finance', 'health', 'math', 'conversion', 'tech', 'engineering', 'business', 'science'];
  categories.forEach(category => {
    urls.push({
      loc: `${BASE_URL}/categories#${category}`,
      lastmod: currentDate,
      changefreq: 'weekly',
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
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Generate and save sitemap
const sitemap = generateSitemap();
const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

try {
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  console.log(`📊 Total URLs: ${sitemap.split('<url>').length - 1}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
