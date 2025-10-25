import { Calculator, Heart, Target, Users } from "lucide-react";

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
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">💰 Finance</h3>
                  <p className="text-sm text-muted-foreground">
                    Loan, mortgage, compound interest, and salary calculators
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">❤️ Health</h3>
                  <p className="text-sm text-muted-foreground">
                    BMI, BMR, calorie, and body composition calculators
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">📐 Math</h3>
                  <p className="text-sm text-muted-foreground">
                    Percentage, average, ratio, and geometry calculators
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">🔄 Conversion</h3>
                  <p className="text-sm text-muted-foreground">
                    Length, weight, temperature, and currency converters
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                Join Our Community
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Thousands of people use SmartCalc Hub every day to make quick calculations and informed decisions. 
                Whether you're planning a loan, tracking your health, doing math homework, or converting units, 
                we're here to help make your life easier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
