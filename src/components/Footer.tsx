import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const popularCalculators = [
    { name: "BMI Calculator", path: "/calculator/bmi" },
    { name: "Loan Calculator", path: "/calculator/loan" },
    { name: "Mortgage Calculator", path: "/calculator/mortgage" },
    { name: "Percentage Calculator", path: "/calculator/percentage" },
    { name: "Compound Interest", path: "/calculator/compound-interest" },
    { name: "Tax Calculator", path: "/calculator/tax" },
    { name: "Age Calculator", path: "/calculator/age" },
    { name: "Calorie Calculator", path: "/calculator/calorie" },
    { name: "Currency Converter", path: "/calculator/currency" },
    { name: "Retirement Calculator", path: "/calculator/retirement" },
  ];

  const categoryLinks = [
    { name: "Finance Calculators", path: "/categories#finance" },
    { name: "Health Calculators", path: "/categories#health" },
    { name: "Math Calculators", path: "/categories#math" },
    { name: "Conversion Tools", path: "/categories#conversion" },
    { name: "Engineering Tools", path: "/categories#engineering" },
    { name: "Business Calculators", path: "/categories#business" },
    { name: "Science Calculators", path: "/categories#science" },
    { name: "Tech Tools", path: "/categories#tech" },
    { name: "Real Estate", path: "/real-estate" },
    { name: "Crypto Calculators", path: "/crypto" },
  ];

  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">SmartCalc Hub</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted platform for accurate, free, and easy-to-use calculators across finance, health, math, and more. 
              Empowering you with tools for smarter decisions.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/ali_haiderseo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/AliHadi768" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:ma7122671@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Calculators */}
          <div>
            <h4 className="font-semibold mb-4">Popular Calculators</h4>
            <ul className="space-y-2">
              {popularCalculators.map((calc) => (
                <li key={calc.path}>
                  <Link to={calc.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categoryLinks.map((cat) => (
                <li key={cat.path}>
                  <Link to={cat.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Calculators
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold mb-3 mt-6">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} SmartCalc Hub. All rights reserved.</p>
          <p className="text-sm mt-2">
            Built with ❤️ by{" "}
            <a 
              href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ali Haider
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
