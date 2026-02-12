import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/siteConfig";

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
  ogImage = `${siteConfig.baseUrl}/og-image.png`,
  canonicalUrl,
  author = siteConfig.author.name,
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteConfig.baseUrl);
  const currentPath = canonicalUrl 
    ? new URL(canonicalUrl).pathname 
    : (typeof window !== 'undefined' ? window.location.pathname : '/');

  return (
    <Helmet>
      <title>{title}</title>

      {/* Standard meta tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - SmartCalc Hub`} />
      <meta property="og:site_name" content="SmartCalc Hub" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && publishedTime && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && publishedTime && (
        <meta property="article:section" content="Calculators & Finance" />
      )}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - SmartCalc Hub`} />
      <meta name="twitter:site" content="@SmartCalcHub" />
      <meta name="twitter:creator" content="@ali_haiderseo" />

      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Hreflang tags */}
      <link rel="alternate" hrefLang="en" href={`${siteConfig.baseUrl}${currentPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteConfig.baseUrl}${currentPath}`} />
    </Helmet>
  );
};
