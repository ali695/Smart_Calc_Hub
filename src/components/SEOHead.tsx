import { useEffect } from "react";
import { isBrowser, safeDocument } from "@/utils/ssrGuards";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords = "calculator, online calculator, free calculator, SmartCalc Hub",
  ogType = "website",
  ogImage = "https://smartcalchub.com/og-image.png",
  canonicalUrl,
  author = "Ali Haider",
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  useEffect(() => {
    // Only update DOM in browser environment
    if (!isBrowser || !safeDocument) return;
    
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonicalUrl || window.location.href, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `${title} - SmartCalc Hub`, true);
    updateMetaTag('og:site_name', 'SmartCalc Hub', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Article-specific OG tags
    if (ogType === 'article' && publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
      updateMetaTag('article:author', author, true);
      updateMetaTag('article:section', 'Calculators & Finance', true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', `${title} - SmartCalc Hub`);
    updateMetaTag('twitter:site', '@SmartCalcHub');
    updateMetaTag('twitter:creator', '@ali_haiderseo');

    // Additional SEO meta tags
    updateMetaTag('theme-color', '#3b82f6');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('format-detection', 'telephone=no');

    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    }

    // Hreflang tags for international SEO
    const currentPath = canonicalUrl ? new URL(canonicalUrl).pathname : window.location.pathname;
    
    // Remove existing hreflang tags
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    
    // Add hreflang tags
    const hreflangs = [
      { lang: 'en', url: `https://smartcalchub.com${currentPath}` },
      { lang: 'de', url: `https://smartcalchub.de${currentPath}` },
      { lang: 'tr', url: `https://smartcalchub.com/tr${currentPath}` },
      { lang: 'x-default', url: `https://smartcalchub.com${currentPath}` }
    ];
    
    hreflangs.forEach(({ lang, url }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', url);
      document.head.appendChild(link);
    });

  }, [title, description, keywords, ogType, ogImage, canonicalUrl, author, publishedTime, modifiedTime]);

  return null;
};
