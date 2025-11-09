interface SchemaMarkupProps {
  type: 'WebApplication' | 'BlogPosting' | 'FAQPage' | 'Organization' | 'BreadcrumbList';
  data: any;
}

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const generateSchema = () => {
    const baseContext = { "@context": "https://schema.org" };
    
    switch (type) {
      case 'WebApplication':
        return {
          ...baseContext,
          "@type": "WebApplication",
          "name": data.name,
          "description": data.description,
          "url": data.url,
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
        return {
          ...baseContext,
          "@type": "BlogPosting",
          "headline": data.headline,
          "description": data.description,
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
              "url": "https://smartcalchub.com/logo.png"
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished,
          "image": data.image,
          "url": data.url
        };
      
      case 'FAQPage':
        return {
          ...baseContext,
          "@type": "FAQPage",
          "mainEntity": data.faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };
      
      case 'Organization':
        return {
          ...baseContext,
          "@type": "Organization",
          "name": "SmartCalc Hub",
          "url": "https://smartcalchub.com",
          "logo": "https://smartcalchub.com/logo.png",
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
        return {
          ...baseContext,
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
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
