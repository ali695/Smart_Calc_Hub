import { calculators } from '@/data/calculators';
import { blogPosts } from '@/data/blogPosts';

const BASE_URL = 'https://smartcalchub.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemapXML = (): string => {
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

  // All calculator pages dynamically from data
  calculators.forEach(calculator => {
    const highPriority = ['bmi', 'loan', 'percentage', 'mortgage', 'length'];
    urls.push({
      loc: `${BASE_URL}${calculator.path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: highPriority.includes(calculator.id) ? 0.9 : 0.8
    });
  });

  // All blog posts dynamically from data
  blogPosts.forEach(post => {
    urls.push({
      loc: `${BASE_URL}/blog/${post.id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    });
  });

  // Category pages with anchors
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

export const getSitemapStats = () => {
  return {
    totalCalculators: calculators.length,
    totalBlogPosts: blogPosts.length,
    totalPages: 8, // Main pages
    totalCategories: 8,
    totalUrls: calculators.length + blogPosts.length + 8 + 8
  };
};
