import { Calculator, Heart, Target, Users, Lightbulb, Shield, Zap, CheckCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { SEOHead } from "@/components/SEOHead";
import { getFullUrl } from "@/config/siteConfig";

const About = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="About SmartCalc Hub | Free Online Calculators"
        description="Learn about SmartCalc Hub – your trusted source for 90+ free, accurate online calculators for finance, health, math, and conversions."
        keywords="about SmartCalc Hub, free calculators, online calculator tools, calculator website"
        canonicalUrl={getFullUrl("/about")}
      />
      <PageHeader 
        title="About SmartCalc Hub"
        description="Your trusted source for fast, accurate, and free online calculators"
        icon={<Info className="h-10 w-10" />}
        category="about"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-8 shadow-large border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                At SmartCalc Hub, we believe that everyone deserves access to powerful, easy-to-use calculation tools. 
                Our mission is to provide free, accurate calculators for finance, health, math, and conversions that 
                help people make informed decisions in their daily lives.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-8 shadow-large border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary-glow/20 to-accent/20 mb-4">
                <Lightbulb className="h-8 w-8 text-primary-glow" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We envision a world where powerful calculation tools are accessible to everyone, regardless of technical 
                expertise or financial resources. By combining innovation with simplicity, we're making complex 
                calculations easy and helping millions make better-informed decisions every day.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="bg-gradient-to-br from-muted/50 to-background rounded-2xl p-10 shadow-large mb-12 border border-border">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20 mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl font-bold mb-2">Core Values</h2>
              <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Accuracy</h3>
                    <p className="text-sm text-muted-foreground">
                      Every formula is verified and tested to ensure reliable results you can trust.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Transparency</h3>
                    <p className="text-sm text-muted-foreground">
                      We show you the formulas behind every calculation, so you understand how results are derived.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Free, fast, and works on any device - no barriers between you and the tools you need.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Trust</h3>
                    <p className="text-sm text-muted-foreground">
                      Your privacy matters. We don't store your data or track your calculations.
                    </p>
                  </div>
                </div>
              </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-large mb-8 border-2 border-primary/10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Heart className="h-7 w-7 text-primary" />
              Why Choose Us
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span className="text-base"><strong>100% Free:</strong> No hidden fees, no sign-up required, completely free to use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span className="text-base"><strong>Instant Results:</strong> Get accurate calculations in real-time as you type</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span className="text-base"><strong>Easy to Use:</strong> Clean, intuitive interface designed for everyone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span className="text-base"><strong>Mobile Friendly:</strong> Works perfectly on all devices - desktop, tablet, and mobile</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span className="text-base"><strong>Privacy First:</strong> We don't store your calculation data or personal information</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-large mb-8 border-2 border-primary/10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Calculator className="h-7 w-7 text-primary" />
              Our Tools
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              We offer a comprehensive suite of calculators across four main categories:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link to="/categories#finance" className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl hover:from-green-500/20 hover:to-green-600/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-green-500/30">
                <h3 className="font-bold text-lg mb-2">Finance</h3>
                <p className="text-sm text-muted-foreground">
                  Loan, mortgage, compound interest, and investment calculators
                </p>
              </Link>
              <Link to="/categories#health" className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl hover:from-red-500/20 hover:to-red-600/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-red-500/30">
                <h3 className="font-bold text-lg mb-2">Health</h3>
                <p className="text-sm text-muted-foreground">
                  BMI, BMR, calorie, and body composition calculators
                </p>
              </Link>
              <Link to="/categories#math" className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl hover:from-blue-500/20 hover:to-blue-600/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-500/30">
                <h3 className="font-bold text-lg mb-2">Math</h3>
                <p className="text-sm text-muted-foreground">
                  Percentage, average, ratio, and geometry calculators
                </p>
              </Link>
              <Link to="/categories#conversion" className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl hover:from-purple-500/20 hover:to-purple-600/10 transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-500/30">
                <h3 className="font-bold text-lg mb-2">Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Length, weight, temperature, and currency converters
                </p>
              </Link>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-large border-2 border-primary/10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Users className="h-7 w-7 text-primary" />
              Our Team
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              SmartCalc Hub is created by a passionate team of data enthusiasts led by{" "}
              <a 
                href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow underline font-semibold transition-colors"
              >
                Ali Haider
              </a>
              , an SEO & Digital Product Designer dedicated to building tools that make complex calculations simple 
              and accessible for everyone. Our mission is to empower users with accurate, instant calculations that 
              help them make better decisions in their daily lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
