import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { calculators } from "@/data/calculators";
import { PageHeader } from "@/components/PageHeader";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Home, Building, TrendingUp, Calculator } from "lucide-react";

const RealEstateCalculators = () => {
  const realEstateCalcs = calculators.filter(calc => calc.category === "real-estate");

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Real Estate Calculators - Property Investment Tools | SmartCalc Hub"
        description="Free real estate calculators for property investors and home buyers. Calculate rent affordability, cap rate, property taxes, and house flip profits instantly."
        keywords="real estate calculator, property investment, rent affordability, cap rate calculator, property tax, house flip calculator, buy vs rent"
        ogType="website"
        canonicalUrl="https://smartcalchub.com/real-estate"
      />
      
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Real Estate Calculators - SmartCalc Hub",
          description: "Free online real estate calculators for property investment analysis and home buying decisions",
          url: "https://smartcalchub.com/real-estate",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          offers: {
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />

      <PageHeader 
        title="Real Estate Calculators"
        description="Professional property investment and home buying calculators"
        icon={<Building className="h-10 w-10" />}
        category="real-estate"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs />

          {/* Category Overview */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Home className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold">Home Buying</h3>
                <p className="text-sm text-muted-foreground">Buy vs rent analysis</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Building className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold">Investment</h3>
                <p className="text-sm text-muted-foreground">Cap rate & ROI</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <TrendingUp className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold">Flipping</h3>
                <p className="text-sm text-muted-foreground">Profit calculations</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Calculator className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold">Taxes</h3>
                <p className="text-sm text-muted-foreground">Property tax estimates</p>
              </div>
            </div>
          </section>

          {/* Calculator Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">All Real Estate Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realEstateCalcs.map((calc) => {
                const CalcIcon = calc.icon;
                return (
                  <Link key={calc.id} to={calc.path}>
                    <Card className="h-full hover:border-amber-500/50 transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-3 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-all">
                            <CalcIcon className="h-6 w-6 text-amber-500" />
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-amber-500 transition-colors">
                          {calc.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {calc.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* SEO Content */}
          <section className="mt-16 prose prose-lg dark:prose-invert max-w-none">
            <h2>Why Use Real Estate Calculators?</h2>
            <p>
              Real estate investments are among the most significant financial decisions you'll make. Our free real estate calculators help you analyze properties, compare buying vs renting, estimate property taxes, and calculate potential profits from house flipping.
            </p>
            
            <h3>Popular Real Estate Calculations</h3>
            <ul>
              <li><strong>Rent Affordability:</strong> Determine how much rent you can comfortably afford based on your income</li>
              <li><strong>Buy vs Rent:</strong> Compare long-term costs of homeownership versus renting</li>
              <li><strong>Cap Rate:</strong> Calculate return on investment for rental properties</li>
              <li><strong>Property Tax:</strong> Estimate annual property tax payments</li>
              <li><strong>House Flip Profit:</strong> Project potential profits from real estate flipping</li>
            </ul>
          </section>
        </div>
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a good cap rate for rental property?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good cap rate typically ranges from 4% to 10%, depending on location and property type. Higher cap rates indicate higher potential returns but may also indicate higher risk."
              }
            },
            {
              "@type": "Question",
              "name": "How much rent can I afford on my salary?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The general rule is that rent should not exceed 30% of your gross monthly income. Use our rent affordability calculator for a personalized recommendation."
              }
            }
          ]
        })}
      </script>
    </div>
  );
};

export default RealEstateCalculators;
