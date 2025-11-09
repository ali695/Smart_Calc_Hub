import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";
import { SEOHead } from "@/components/SEOHead";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  howItWorks: string;
  formula: string;
  faqs: FAQ[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  category?: string;
}

export const CalculatorLayout = ({
  title,
  description,
  children,
  howItWorks,
  formula,
  faqs,
  seoTitle,
  seoDescription,
  keywords,
  canonicalUrl,
  category = "Utility"
}: CalculatorLayoutProps) => {
  // Map category IDs to display names
  const categoryNames: Record<string, string> = {
    finance: "Finance",
    health: "Health",
    math: "Math",
    conversion: "Conversion",
    utility: "Utility"
  };

  // Map category IDs to paths
  const categoryPaths: Record<string, string> = {
    finance: "/categories#finance",
    health: "/categories#health",
    math: "/categories#math",
    conversion: "/categories#conversion",
    utility: "/categories"
  };
  // Generate SoftwareApplication structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": seoDescription || description,
    "url": canonicalUrl || typeof window !== "undefined" ? window.location.href : "",
    "author": {
      "@type": "Person",
      "name": "Ali Haider",
      "url": "https://www.linkedin.com/in/ali-haider-seo-consultant/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartCalc Hub",
      "url": "https://smartcalchub.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smartcalchub.com/logo.png"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Free online calculator",
      "Instant results",
      "No registration required",
      "Mobile-friendly interface",
      "Privacy-focused (no data storage)"
    ]
  };

  // Generate BreadcrumbList structured data for SEO
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smartcalchub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryNames[category.toLowerCase()] || "Calculators",
        "item": `https://smartcalchub.com${categoryPaths[category.toLowerCase()] || "/categories"}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl || (typeof window !== "undefined" ? window.location.href : "")
      }
    ]
  };

  // Generate FAQPage structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title={seoTitle || `${title} | SmartCalc Hub`}
        description={seoDescription || description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
      />
      
      {/* SoftwareApplication Schema */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      
      <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to={categoryPaths[category.toLowerCase()] || "/categories"} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {categoryNames[category.toLowerCase()] || "Calculators"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          {/* Calculator Card */}
          <Card className="p-6 md:p-8 shadow-large">
            {children}
          </Card>

          {/* How It Works */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{howItWorks}</p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Formula</h3>
              <code className="text-sm">{formula}</code>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};
