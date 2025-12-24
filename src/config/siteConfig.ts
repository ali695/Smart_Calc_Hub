/**
 * Site Configuration
 * Central configuration for site-wide settings including URLs
 */

export const siteConfig = {
  // Primary domain - used for canonical URLs, Schema.org, and sitemap
  baseUrl: "https://smartcalhub.online",
  
  // Site name
  siteName: "SmartCalc Hub",
  
  // Default social images
  defaultOgImage: "/og-image.png",
  logo: "/logo.png",
  
  // Social media handles
  twitter: "@SmartCalcHub",
  twitterCreator: "@ali_haiderseo",
  
  // Author information
  author: {
    name: "Ali Haider",
    url: "https://www.linkedin.com/in/ali-haider-seo-consultant/",
    email: "ma7122671@gmail.com"
  },
  
  // Publisher info for Schema.org
  publisher: {
    name: "SmartCalc Hub",
    get url() { return siteConfig.baseUrl; },
    get logo() { return `${siteConfig.baseUrl}/logo.png`; }
  }
} as const;

// Helper function to build full URL
export const getFullUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalizedPath}`;
};

// Export for convenient access
export default siteConfig;
