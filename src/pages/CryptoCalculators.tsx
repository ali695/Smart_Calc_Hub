import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { calculators } from "@/data/calculators";
import { PageHeader } from "@/components/PageHeader";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Coins, TrendingUp, Cpu, ArrowLeftRight } from "lucide-react";

const CryptoCalculators = () => {
  const cryptoCalcs = calculators.filter(calc => calc.category === "crypto");

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Crypto Calculators - Bitcoin & Cryptocurrency Tools | SmartCalc Hub"
        description="Free cryptocurrency calculators for Bitcoin, Ethereum and more. Calculate crypto profits, DCA returns, mining profitability, and convert BTC to USD instantly."
        keywords="crypto calculator, bitcoin calculator, cryptocurrency profit, DCA calculator, mining profitability, BTC to USD converter"
        ogType="website"
        canonicalUrl="https://smartcalchub.com/crypto"
      />
      
      <SchemaMarkup
        type="WebApplication"
        data={{
          name: "Crypto Calculators - SmartCalc Hub",
          description: "Free online cryptocurrency calculators for Bitcoin, profit calculations, DCA strategy, and mining profitability",
          url: "https://smartcalchub.com/crypto",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          offers: {
            price: "0",
            priceCurrency: "USD"
          }
        }}
      />

      <PageHeader 
        title="Crypto Calculators"
        description="Cryptocurrency investment and trading calculators"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs />

          {/* Category Overview */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <Coins className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold">Profit/Loss</h3>
                <p className="text-sm text-muted-foreground">Track crypto gains</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <TrendingUp className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold">DCA Strategy</h3>
                <p className="text-sm text-muted-foreground">Dollar cost averaging</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <ArrowLeftRight className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold">Conversion</h3>
                <p className="text-sm text-muted-foreground">BTC to USD & more</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <Cpu className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold">Mining</h3>
                <p className="text-sm text-muted-foreground">Profitability analysis</p>
              </div>
            </div>
          </section>

          {/* Calculator Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">All Crypto Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptoCalcs.map((calc) => {
                const CalcIcon = calc.icon;
                return (
                  <Link key={calc.id} to={calc.path}>
                    <Card className="h-full hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-3 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-all">
                            <CalcIcon className="h-6 w-6 text-yellow-500" />
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-yellow-500 transition-colors">
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
            <h2>Why Use Crypto Calculators?</h2>
            <p>
              Cryptocurrency markets are volatile and complex. Our free crypto calculators help you track profits and losses, plan DCA investment strategies, estimate mining profitability, and convert between Bitcoin and fiat currencies.
            </p>
            
            <h3>Popular Crypto Calculations</h3>
            <ul>
              <li><strong>Crypto Profit:</strong> Calculate gains or losses on your cryptocurrency trades</li>
              <li><strong>DCA Calculator:</strong> See how dollar cost averaging affects your returns over time</li>
              <li><strong>Bitcoin Converter:</strong> Instantly convert between BTC and USD</li>
              <li><strong>Mining Profit:</strong> Estimate mining profitability based on hash rate and electricity costs</li>
            </ul>

            <h3>Understanding Crypto Investment Strategies</h3>
            <p>
              Dollar Cost Averaging (DCA) is a popular strategy where you invest a fixed amount at regular intervals, regardless of price. This reduces the impact of volatility and removes emotional decision-making from your investment process.
            </p>
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
              "name": "How do I calculate crypto profit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Crypto profit is calculated by subtracting your total investment (buy price × quantity) from your current value (sell price × quantity). Our calculator also shows ROI percentage."
              }
            },
            {
              "@type": "Question",
              "name": "What is DCA in cryptocurrency?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DCA (Dollar Cost Averaging) means investing a fixed amount regularly regardless of price. This strategy reduces volatility risk and is popular for long-term crypto investing."
              }
            }
          ]
        })}
      </script>
    </div>
  );
};

export default CryptoCalculators;
