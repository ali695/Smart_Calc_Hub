/**
 * Maps calculator categories to their respective OG images
 */
export const getCategoryOGImage = (category: string): string => {
  const categoryMap: Record<string, string> = {
    finance: 'https://smartcalchub.com/og-finance.png',
    health: 'https://smartcalchub.com/og-health.png',
    math: 'https://smartcalchub.com/og-math.png',
    conversion: 'https://smartcalchub.com/og-conversion.png',
    utility: 'https://smartcalchub.com/og-utility.png',
    engineering: 'https://smartcalchub.com/og-engineering.png',
    tech: 'https://smartcalchub.com/og-tech.png',
  };

  return categoryMap[category.toLowerCase()] || 'https://smartcalchub.com/og-calculator.png';
};

export const getBlogOGImage = (): string => {
  return 'https://smartcalchub.com/og-blog.png';
};

export const getDefaultOGImage = (): string => {
  return 'https://smartcalchub.com/og-calculator.png';
};
