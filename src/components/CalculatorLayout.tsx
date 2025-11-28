import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { AIRecommendation } from "@/components/AIRecommendation";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { getCategoryOGImage } from "@/utils/ogImageMapping";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

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
  calculatorId?: string;
  ogImage?: string;
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
  category = "Utility",
  calculatorId,
  ogImage
}: CalculatorLayoutProps) => {
  const location = useLocation();
  const { addRecentCalculator } = useRecentCalculators();

  // Track recently used calculator
  useEffect(() => {
    addRecentCalculator({
      name: title,
      url: location.pathname,
      category: category.toLowerCase(),
    });
  }, [title, location.pathname, category, addRecentCalculator]);

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
  
  // Generate WebApplication structured data (replaces SoftwareApplication)
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "url": canonicalUrl || (typeof window !== "undefined" ? window.location.href : ""),
    "applicationCategory": categoryNames[category.toLowerCase()] || "UtilityApplication",
    "operatingSystem": "All",
    "description": seoDescription || description,
    "author": {
      "@type": "Person",
      "name": "Ali Haider",
      "url": "https://www.linkedin.com/in/ali-haider-seo-consultant/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartCalc Hub",
      "url": "https://smartcalchub.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "842"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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

  // Generate HowTo structured data for step-by-step instructions
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${title}`,
    "description": description,
    "image": getCategoryOGImage(category),
    "totalTime": "PT2M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "tool": {
      "@type": "HowToTool",
      "name": title
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter Your Values",
        "text": "Input the required values into the calculator fields. Make sure all values are accurate for the best results.",
        "image": getCategoryOGImage(category)
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Click Calculate",
        "text": "Press the calculate button to process your inputs and generate results based on the formula.",
        "image": getCategoryOGImage(category)
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Review Results",
        "text": "Analyze the calculated results displayed. You can copy the results or print them for your records.",
        "image": getCategoryOGImage(category)
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle || `${title} | SmartCalc Hub`}
        description={seoDescription || description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType="website"
        ogImage={ogImage || getCategoryOGImage(category)}
        author="Ali Haider"
      />
      
      {/* WebApplication Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webApplicationSchema)}
      </script>
      
      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>

      {/* HowTo Schema */}
      <script type="application/ld+json">
        {JSON.stringify(howToStructuredData)}
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

          {/* AI Recommendation */}
          <AIRecommendation 
            calculatorType={title}
            result={null}
            category={category.toLowerCase()}
          />

          {/* Related Calculators Section */}
          {category && (
            <RelatedCalculators 
              category={category.toLowerCase()} 
              currentCalculatorId={calculatorId}
              maxItems={4}
            />
          )}
        </div>
      </div>
    </div>
    </>
  );
};
