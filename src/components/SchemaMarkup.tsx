import { sanitizeString, sanitizeUrl } from "./InputSanitizer";

interface WebApplicationData {
  name: string;
  description: string;
  url: string;
}

interface BlogPostingData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
}

interface FAQData {
  faqs: Array<{ question: string; answer: string }>;
}

interface OrganizationData {
  // No additional fields needed, uses defaults
}

interface BreadcrumbData {
  items: Array<{ name: string; url: string }>;
}

type SchemaData = WebApplicationData | BlogPostingData | FAQData | OrganizationData | BreadcrumbData;

interface SchemaMarkupProps {
  type: 'WebApplication' | 'BlogPosting' | 'FAQPage' | 'Organization' | 'BreadcrumbList';
  data: SchemaData;
}

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const generateSchema = () => {
    const baseContext = { "@context": "https://schema.org" };
    
    switch (type) {
      case 'WebApplication':
        const webAppData = data as WebApplicationData;
        return {
          ...baseContext,
          "@type": "WebApplication",
          "name": sanitizeString(webAppData.name, 100),
          "description": sanitizeString(webAppData.description, 500),
          "url": sanitizeUrl(webAppData.url) || "https://smartcalhub.online",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "842"
          }
        };
      
      case 'BlogPosting':
        const blogData = data as BlogPostingData;
        return {
          ...baseContext,
          "@type": "BlogPosting",
          "headline": sanitizeString(blogData.headline, 200),
          "description": sanitizeString(blogData.description, 500),
          "author": {
            "@type": "Person",
            "name": "Ali Haider",
            "url": "https://www.linkedin.com/in/ali-haider-seo-consultant/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SmartCalc Hub",
            "logo": {
              "@type": "ImageObject",
              "url": "https://smartcalhub.online/logo.png"
            }
          },
          "datePublished": blogData.datePublished,
          "dateModified": blogData.dateModified || blogData.datePublished,
          "image": sanitizeUrl(blogData.image) || "https://smartcalhub.online/og-image.png",
          "url": sanitizeUrl(blogData.url) || "https://smartcalhub.online"
        };
      
      case 'FAQPage':
        const faqData = data as FAQData;
        return {
          ...baseContext,
          "@type": "FAQPage",
          "mainEntity": faqData.faqs.map((faq) => ({
            "@type": "Question",
            "name": sanitizeString(faq.question, 200),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": sanitizeString(faq.answer, 2000)
            }
          }))
        };
      
      case 'Organization':
        return {
          ...baseContext,
          "@type": "Organization",
          "name": "SmartCalc Hub",
          "url": "https://smartcalhub.online",
          "logo": "https://smartcalhub.online/logo.png",
          "founder": {
            "@type": "Person",
            "name": "Ali Haider"
          },
          "sameAs": [
            "https://www.linkedin.com/in/ali-haider-seo-consultant/",
            "https://www.instagram.com/ali_haiderseo/",
            "https://www.facebook.com/AliHadi768"
          ]
        };
      
      case 'BreadcrumbList':
        const breadcrumbData = data as BreadcrumbData;
        return {
          ...baseContext,
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbData.items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": sanitizeString(item.name, 100),
            "item": sanitizeUrl(item.url) || "https://smartcalhub.online"
          }))
        };
      
      default:
        return baseContext;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
    />
  );
};
