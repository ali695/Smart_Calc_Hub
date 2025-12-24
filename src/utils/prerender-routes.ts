/**
 * Routes to be pre-rendered by react-snap
 * 
 * This list includes all public marketing pages and calculator pages
 * that should have SEO-optimized static HTML.
 */

import { calculators } from '@/data/calculators';
import { blogPosts } from '@/data/blogPosts';

// Static marketing pages
const staticRoutes = [
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
];

// Generate calculator routes from data (use path directly)
const calculatorRoutes = calculators.map(calc => calc.path);

// Generate blog post routes from data
const blogRoutes = blogPosts.map(post => `/blog/${post.id}`);

// Category anchor routes
const categoryRoutes = [
  '/categories#finance',
  '/categories#health',
  '/categories#math',
  '/categories#conversion',
  '/categories#tech',
  '/categories#engineering',
  '/categories#business',
  '/categories#science',
];

// Combine all routes for pre-rendering
export const prerenderRoutes = [
  ...staticRoutes,
  ...calculatorRoutes,
  ...blogRoutes,
  ...categoryRoutes,
];

// Routes that should NOT be pre-rendered (require authentication)
export const excludedRoutes = [
  '/auth',
  '/dashboard',
  '/profile',
  '/admin',
  '/blog-generator',
];

export default prerenderRoutes;
