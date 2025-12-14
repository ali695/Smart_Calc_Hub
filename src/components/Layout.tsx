import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Footer } from "./Footer";
import { AIChatbot } from "./AIChatbot";
import { useAdminCheck } from "@/hooks/useAdminCheck";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAdminCheck();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Global Organization Schema - appears on all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmartCalc Hub",
    "url": "https://smartcalchub.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://smartcalchub.com/logo.png",
      "width": "512",
      "height": "512"
    },
    "description": "Free, accurate, and modern online calculators for everyday life. Finance, health, math, and conversion tools.",
    "sameAs": [
      "https://www.facebook.com/AliHadi768",
      "https://www.instagram.com/ali_haiderseo/",
      "https://www.linkedin.com/in/ali-haider-seo-consultant/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "ma7122671@gmail.com",
      "contactType": "Customer Support"
    },
    "founder": {
      "@type": "Person",
      "name": "Ali Haider",
      "url": "https://www.linkedin.com/in/ali-haider-seo-consultant/",
      "sameAs": [
        "https://www.linkedin.com/in/ali-haider-seo-consultant/",
        "https://www.instagram.com/ali_haiderseo/",
        "https://www.facebook.com/AliHadi768"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Sticky Header with blur effect */}
      <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-xl bg-background/90 dark:bg-background/80 supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo with Schema Markup */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl" itemScope itemType="https://schema.org/Organization">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="bg-gradient-primary bg-clip-text text-transparent" itemProp="name">
                SmartCalc Hub
              </span>
              <meta itemProp="url" content="https://smartcalchub.com" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300">
                Home
              </Link>
              <Link to="/categories" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300">
                Categories
              </Link>
              <Link to="/about" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300">
                About
              </Link>
              <Link to="/contact" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300">
                Contact
              </Link>
              <Link to="/faq" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300">
                FAQ
              </Link>
              <Link to="/blog" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300">
                Blog
              </Link>
              {isAdmin && (
                <Link to="/admin" className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary-glow hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <div className="neon-ring rounded-lg transition-all">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-3 border-t animate-fade-in">
              <Link
                to="/"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/blog"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* AI Chatbot */}
      <AIChatbot />

      <Footer />
    </div>
  );
};
