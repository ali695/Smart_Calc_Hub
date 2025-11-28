const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://smartcalchub.com';

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
    { loc: `${BASE_URL}/terms`, lastmod: currentDate, changefreq: 'yearly', priority: 0.5 }
  );

  // All calculator pages (100+ calculators)
  const calculatorPaths = [
    // Finance Calculators (20)
    '/calculator/loan', '/calculator/mortgage', '/calculator/emi', '/calculator/compound-interest',
    '/calculator/simple-interest', '/calculator/investment-return', '/calculator/retirement',
    '/calculator/savings-goal', '/calculator/car-loan', '/calculator/budget-planner',
    '/calculator/tax', '/calculator/salary-after-tax', '/calculator/discount',
    '/calculator/inflation', '/calculator/credit-card', '/calculator/net-worth',
    '/calculator/debt-to-income', '/calculator/ltv', '/calculator/profit-margin', '/calculator/break-even',
    
    // Health Calculators (20)
    '/calculator/bmi', '/calculator/bmr', '/calculator/calorie', '/calculator/tdee',
    '/calculator/macro', '/calculator/ideal-weight', '/calculator/body-fat', '/calculator/protein',
    '/calculator/water', '/calculator/calorie-deficit', '/calculator/heart-rate',
    '/calculator/blood-pressure', '/calculator/body-surface-area', '/calculator/waist-to-height',
    '/calculator/pregnancy', '/calculator/menstrual', '/calculator/basal-temp', '/calculator/steps',
    '/calculator/sleep',
    
    // Math Calculators (20)
    '/calculator/percentage', '/calculator/percentage-change', '/calculator/fraction',
    '/calculator/average', '/calculator/quadratic', '/calculator/pythagoras',
    '/calculator/triangle-area', '/calculator/circle', '/calculator/volume',
    '/calculator/area-perimeter', '/calculator/exponent', '/calculator/logarithm',
    '/calculator/factorial', '/calculator/permutation-combination', '/calculator/scientific-notation',
    '/calculator/ratio', '/calculator/square-root', '/calculator/prime',
    
    // Trigonometry Calculators (7)
    '/calculator/sine', '/calculator/cosine', '/calculator/tangent',
    '/calculator/arcsin', '/calculator/arccos', '/calculator/arctan', '/calculator/radian-degree',
    
    // Conversion Calculators (10)
    '/calculator/length', '/calculator/weight', '/calculator/temperature',
    '/calculator/currency', '/calculator/area', '/calculator/speed',
    '/calculator/pressure', '/calculator/energy', '/calculator/data-transfer', '/calculator/timezone',
    
    // Engineering & Science Calculators (15)
    '/calculator/power', '/calculator/ohms-law', '/calculator/force', '/calculator/torque',
    '/calculator/density', '/calculator/kinetic-energy', '/calculator/stress-strain',
    '/calculator/fuel-efficiency', '/calculator/ph', '/calculator/molarity', '/calculator/half-life',
    
    // Business Calculators (8)
    '/calculator/growth-rate', '/calculator/conversion-rate', '/calculator/customer-lifetime-value',
    '/calculator/inventory-turnover', '/calculator/payback-period',
    
    // Tech/Utility Calculators (6)
    '/calculator/password-generator', '/calculator/hash-generator', '/calculator/base64-encoder',
    '/calculator/json-formatter', '/calculator/color-converter', '/calculator/age'
  ];

  calculatorPaths.forEach(path => {
    const highPriorityPaths = ['/calculator/bmi', '/calculator/loan', '/calculator/percentage', '/calculator/mortgage'];
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
    'scientific-calculator-guide-engineers'
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
  const categories = ['finance', 'health', 'math', 'conversion', 'tech', 'engineering', 'business'];
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
