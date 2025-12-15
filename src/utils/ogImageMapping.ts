/**
 * Maps calculator categories to their respective OG images
 */
export const getCategoryOGImage = (category: string): string => {
  const categoryMap: Record<string, string> = {
    finance: '/og-finance.png',
    health: '/og-health.png',
    math: '/og-math.png',
    conversion: '/og-conversion.png',
    utility: '/og-utility.png',
    engineering: '/og-engineering.png',
    tech: '/og-tech.png',
  };

  return categoryMap[category.toLowerCase()] || '/og-calculator.png';
};

/**
 * Maps blog categories to their respective hero images
 */
export const getBlogHeroImage = (category: string): string => {
  const heroMap: Record<string, string> = {
    finance: '/blog-hero-finance.webp',
    health: '/blog-hero-health.webp',
    math: '/blog-hero-math.webp',
    conversion: '/blog-hero-conversion.webp',
    business: '/blog-hero-business.webp',
    utility: '/blog-hero-tech.webp',
    engineering: '/blog-hero-engineering.webp',
    tech: '/blog-hero-tech.webp',
    science: '/blog-hero-science.webp',
  };

  return heroMap[category.toLowerCase()] || '/blog-hero-finance.webp';
};

export const getBlogOGImage = (): string => {
  return '/og-blog.png';
};

export const getDefaultOGImage = (): string => {
  return '/og-calculator.png';
};
