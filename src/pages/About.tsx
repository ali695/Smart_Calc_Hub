import { Calculator, Heart, Target, Users, Lightbulb, Shield, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About SmartCalc Hub</h1>
            <p className="text-lg text-muted-foreground">
              Your trusted source for fast, accurate, and free online calculators
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At SmartCalc Hub, we believe that everyone deserves access to powerful, easy-to-use calculation tools. 
                Our mission is to provide free, accurate calculators for finance, health, math, and conversions that 
                help people make informed decisions in their daily lives.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where powerful calculation tools are accessible to everyone, regardless of technical 
                expertise or financial resources. By combining innovation with simplicity, we're making complex 
                calculations easy and helping millions make better-informed decisions every day.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Core Values
              </h2>
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

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                Why Choose Us
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>100% Free:</strong> No hidden fees, no sign-up required, completely free to use</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Instant Results:</strong> Get accurate calculations in real-time as you type</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Easy to Use:</strong> Clean, intuitive interface designed for everyone</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Mobile Friendly:</strong> Works perfectly on all devices - desktop, tablet, and mobile</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Privacy First:</strong> We don't store your calculation data or personal information</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Calculator className="h-6 w-6 text-primary" />
                Our Tools
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a comprehensive suite of calculators across four main categories:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/categories#finance" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                  <h3 className="font-semibold mb-2">Finance</h3>
                  <p className="text-sm text-muted-foreground">
                    Loan, mortgage, compound interest, and investment calculators
                  </p>
                </Link>
                <Link to="/categories#health" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                  <h3 className="font-semibold mb-2">Health</h3>
                  <p className="text-sm text-muted-foreground">
                    BMI, BMR, calorie, and body composition calculators
                  </p>
                </Link>
                <Link to="/categories#math" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                  <h3 className="font-semibold mb-2">Math</h3>
                  <p className="text-sm text-muted-foreground">
                    Percentage, average, ratio, and geometry calculators
                  </p>
                </Link>
                <Link to="/categories#conversion" className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                  <h3 className="font-semibold mb-2">Conversion</h3>
                  <p className="text-sm text-muted-foreground">
                    Length, weight, temperature, and currency converters
                  </p>
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                Our Team
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                SmartCalc Hub is created by a passionate team of data enthusiasts led by{" "}
                <a 
                  href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
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
    </div>
  );
};

export default About;
