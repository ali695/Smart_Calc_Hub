import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode, useEffect, createContext, useContext, useState, useCallback } from "react";
import { SEOHead } from "@/components/SEOHead";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { AIInsightCard } from "@/components/AIInsightCard";
import { CalculatorActions } from "@/components/CalculatorActions";
import { RegionToggle } from "@/components/RegionToggle";
import { CalculatorSEOContent } from "@/components/CalculatorSEOContent";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { useRealtimeHistory } from "@/hooks/useRealtimeHistory";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useRegion } from "@/contexts/RegionContext";
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
import { PageHeader } from "@/components/PageHeader";
import { Calculator } from "lucide-react";

// Context for sharing AI insight data between calculator and layout
interface AIInsightContextType {
  inputs: Record<string, any>;
  results: Record<string, any> | null;
  setInputs: (inputs: Record<string, any>) => void;
  setResults: (results: Record<string, any> | null) => void;
}

const AIInsightContext = createContext<AIInsightContextType | null>(null);

export const useAIInsightContext = () => {
  const context = useContext(AIInsightContext);
  return context;
};

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
  const { saveHistory } = useRealtimeHistory();
  const { logPageView } = useAnalytics();
  const { region, config } = useRegion();
  
  // State for AI Insight context
  const [aiInputs, setAiInputs] = useState<Record<string, any>>({});
  const [aiResults, setAiResults] = useState<Record<string, any> | null>(null);

  // Extract calculator slug from path
  const calculatorSlug = location.pathname.split('/').pop() || '';

  // Smooth scroll to top on calculator page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Track recently used calculator and log page view
  useEffect(() => {
    addRecentCalculator({
      name: title,
      url: location.pathname,
      category: category.toLowerCase(),
    });
    logPageView(calculatorSlug);
  }, [title, location.pathname, category, addRecentCalculator, logPageView, calculatorSlug]);

  // Auto-save to history when results change
  useEffect(() => {
    if (aiResults && Object.keys(aiResults).length > 0) {
      saveHistory(calculatorSlug, aiInputs, aiResults);
    }
  }, [aiResults, aiInputs, calculatorSlug, saveHistory]);

  // Map category IDs to display names
  const categoryNames: Record<string, string> = {
    finance: "Finance",
    health: "Health",
    math: "Math",
    conversion: "Conversion",
    utility: "Utility",
    tech: "Tech Tools",
    engineering: "Engineering",
    business: "Business",
    science: "Science",
    'real-estate': "Real Estate",
    crypto: "Crypto"
  };

  // Map category IDs to paths
  const categoryPaths: Record<string, string> = {
    finance: "/categories#finance",
    health: "/categories#health",
    math: "/categories#math",
    conversion: "/categories#conversion",
    utility: "/categories",
    tech: "/categories#tech",
    engineering: "/categories#engineering",
    business: "/categories#business",
    science: "/categories#science",
    'real-estate': "/real-estate",
    crypto: "/crypto"
  };
  
  // Build canonical URL
  const baseUrl = "https://smartcalchub.com";
  const currentPath = location.pathname;
  const fullCanonicalUrl = canonicalUrl || `${baseUrl}${currentPath}`;
  const ogImageUrl = ogImage || `${baseUrl}${getCategoryOGImage(category)}`;

  // Generate WebApplication structured data (replaces SoftwareApplication)
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "url": fullCanonicalUrl,
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
      "url": baseUrl
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
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryNames[category.toLowerCase()] || "Calculators",
        "item": `${baseUrl}${categoryPaths[category.toLowerCase()] || "/categories"}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": fullCanonicalUrl
      }
    ]
  };

  // Generate FAQPage structured data
  const faqStructuredData = faqs.length > 0 ? {
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
  } : null;

  // Generate HowTo structured data for step-by-step instructions
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${title}`,
    "description": description,
    "image": ogImageUrl,
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
        "image": ogImageUrl
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Click Calculate",
        "text": "Press the calculate button to process your inputs and generate results based on the formula.",
        "image": ogImageUrl
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Review Results",
        "text": "Analyze the calculated results displayed. You can copy the results or print them for your records.",
        "image": ogImageUrl
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle || `${title} | SmartCalc Hub`}
        description={seoDescription || description}
        keywords={keywords}
        canonicalUrl={fullCanonicalUrl}
        ogType="website"
        ogImage={ogImageUrl}
        author="Ali Haider"
      />
      
      {/* WebApplication Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      
      {/* FAQPage Schema - only render if FAQs exist */}
      {faqStructuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      {/* BreadcrumbList Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* HowTo Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
      />
      
      <div className="min-h-screen">
        <PageHeader 
          title={title}
          description={description}
          icon={<Calculator className="h-10 w-10" />}
          category={category.toLowerCase()}
        />
        
        <div className="container mx-auto px-4 py-12">
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

          {/* Calculator Card */}
          <Card className="p-6 md:p-8 shadow-large animate-fade-in relative">
            {/* Region Toggle with Currency Selector */}
            <div className="absolute top-4 right-4">
              <RegionToggle 
                showCurrency={true} 
                category={category.toLowerCase()} 
                calculatorSlug={calculatorSlug} 
              />
            </div>
            <AIInsightContext.Provider
              value={{
                inputs: aiInputs,
                results: aiResults,
                setInputs: setAiInputs,
                setResults: setAiResults,
              }}
            >
              {children}

              {/* Calculator Actions - Favorites, Copy, Print, Share */}
              <CalculatorActions
                calculatorSlug={calculatorSlug}
                calculatorName={title}
                results={aiResults}
                inputs={aiInputs}
              />

              {/* AI Insight Card (inside Provider so hook can access context) */}
              <AIInsightCard
                calculatorName={title}
                category={category.toLowerCase()}
                inputs={aiInputs}
                results={aiResults}
                autoTrigger={true}
              />
            </AIInsightContext.Provider>
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

          {/* SEO Content Section - unique content for each calculator */}
          <CalculatorSEOContent calculatorSlug={calculatorSlug} />

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
