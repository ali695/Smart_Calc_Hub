import { Link } from "react-router-dom";
import { Calculator, Moon, Sun, Menu, X, Linkedin, Instagram, Heart, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                SmartCalc Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/categories" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/faq" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Blog
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
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
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Premium Footer */}
      <footer className="relative border-t bg-gradient-to-br from-muted/30 via-background to-muted/20 mt-20 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.02] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand - Larger emphasis */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-2xl text-gradient">
                  SmartCalc Hub
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Free, accurate, and modern online calculators for everyday life. Built with ❤️ to help you make smarter decisions.
              </p>
              <div className="space-y-3">
                <a 
                  href="mailto:ma7122671@gmail.com" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="font-medium">Email:</span>
                  <span className="hover:underline">ma7122671@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-lg mb-6 text-foreground">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    All Calculators
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Calculators */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-lg mb-6 text-foreground">Popular Tools</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/calculator/bmi" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    BMI Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculator/loan" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculator/percentage" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Percentage Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculator/mortgage" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Mortgage Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/calculator/calorie" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    Calorie Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-6 text-foreground">Connect</h3>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 border border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-blue-500">LinkedIn</span>
                </a>
                <a 
                  href="https://www.instagram.com/ali_haiderseo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/5 hover:from-pink-500/20 hover:to-purple-500/10 border border-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-pink-500">Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/AliHadi768" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-blue-600/10 to-blue-700/5 hover:from-blue-600/20 hover:to-blue-700/10 border border-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-blue-600">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-sm text-muted-foreground text-center md:text-left">
                <p>© 2025 SmartCalc Hub. All rights reserved.</p>
              </div>

              {/* Credits */}
              <div className="text-sm text-muted-foreground text-center">
                <span>Built with </span>
                <Heart className="inline h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                <span> by </span>
                <a 
                  href="https://www.linkedin.com/in/ali-haider-seo-consultant/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Ali Haider
                </a>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-border">•</span>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
