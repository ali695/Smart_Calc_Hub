import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { isBrowser, safeWindow, safeDocument } from "@/utils/ssrGuards";

type CategoryType = 
  | "home" | "finance" | "health" | "math" | "conversion" 
  | "tech" | "engineering" | "science" | "business" 
  | "real-estate" | "crypto" | "blog" | "faq" | "contact" | "about" | "utility";

interface HeroSectionProps {
  category?: CategoryType | string;
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  showBackgroundImage?: boolean;
}

// Background images and fallback colors for categories and pages
const categoryImages: Record<string, { image: string; fallback: string }> = {
  home: { image: "/hero-calculators.webp", fallback: "#1a5fb4" },
  finance: { image: "/blog-hero-finance-new.webp", fallback: "#1a7f37" },
  health: { image: "/blog-hero-health-new.webp", fallback: "#c53030" },
  math: { image: "/blog-hero-math-new.webp", fallback: "#0891b2" },
  conversion: { image: "/blog-hero-conversion-new.webp", fallback: "#7c3aed" },
  tech: { image: "/blog-hero-tech-new.webp", fallback: "#0f766e" },
  engineering: { image: "/blog-hero-engineering-new.webp", fallback: "#1e40af" },
  science: { image: "/blog-hero-science-new.webp", fallback: "#4f46e5" },
  business: { image: "/blog-hero-business-new.webp", fallback: "#1e3a5f" },
  "real-estate": { image: "/blog-hero-finance-new.webp", fallback: "#c2410c" },
  crypto: { image: "/blog-hero-finance-new.webp", fallback: "#b45309" },
  blog: { image: "/hero-blog.webp", fallback: "#6b21a8" },
  faq: { image: "/hero-faq.webp", fallback: "#0d9488" },
  contact: { image: "/hero-contact.webp", fallback: "#0369a1" },
  about: { image: "/hero-about.webp", fallback: "#9333ea" },
  utility: { image: "/hero-calculators.webp", fallback: "#1a5fb4" }
};

// Create a global event for calculate pulse (browser only)
export const triggerCalculatePulse = () => {
  if (isBrowser && safeWindow) {
    safeWindow.dispatchEvent(new CustomEvent('calculatePulse'));
  }
};

// Gradient mappings for light and dark modes
const gradients: Record<string, { light: string; dark: string }> = {
  home: {
    light: "linear-gradient(120deg, #0066ff, #00b4ff, #00e5cc)",
    dark: "linear-gradient(120deg, #0044cc, #0088cc, #00aa99)"
  },
  finance: {
    light: "linear-gradient(120deg, #00c853, #b2ff59)",
    dark: "linear-gradient(120deg, #00c853, #007e33)"
  },
  health: {
    light: "linear-gradient(120deg, #ff6b6b, #feca57)",
    dark: "linear-gradient(120deg, #ff416c, #ff4b2b)"
  },
  math: {
    light: "linear-gradient(120deg, #1de9b6, #1dc4e9)",
    dark: "linear-gradient(120deg, #00b09b, #96c93d)"
  },
  conversion: {
    light: "linear-gradient(120deg, #a18cd1, #fbc2eb)",
    dark: "linear-gradient(120deg, #667eea, #764ba2)"
  },
  tech: {
    light: "linear-gradient(120deg, #2193b0, #6dd5ed)",
    dark: "linear-gradient(120deg, #0f2027, #203a43, #2c5364)"
  },
  engineering: {
    light: "linear-gradient(120deg, #42a5f5, #478ed1)",
    dark: "linear-gradient(120deg, #1e3c72, #2a5298)"
  },
  science: {
    light: "linear-gradient(120deg, #64b5f6, #81c784)",
    dark: "linear-gradient(120deg, #283e51, #485563)"
  },
  business: {
    light: "linear-gradient(120deg, #396afc, #2948ff)",
    dark: "linear-gradient(120deg, #141E30, #243B55)"
  },
  "real-estate": {
    light: "linear-gradient(120deg, #ffa751, #ffe259)",
    dark: "linear-gradient(120deg, #fc4a1a, #f7b733)"
  },
  crypto: {
    light: "linear-gradient(120deg, #ffb347, #ffcc33)",
    dark: "linear-gradient(120deg, #ff8c00, #ffb347)"
  },
  blog: {
    light: "linear-gradient(120deg, #667eea, #764ba2)",
    dark: "linear-gradient(120deg, #434343, #1a1a2e)"
  },
  faq: {
    light: "linear-gradient(120deg, #11998e, #38ef7d)",
    dark: "linear-gradient(120deg, #0f9b0f, #1a1a2e)"
  },
  contact: {
    light: "linear-gradient(120deg, #4facfe, #00f2fe)",
    dark: "linear-gradient(120deg, #2193b0, #6dd5ed)"
  },
  about: {
    light: "linear-gradient(120deg, #fa709a, #fee140)",
    dark: "linear-gradient(120deg, #c31432, #240b36)"
  },
  utility: {
    light: "linear-gradient(120deg, #0066ff, #00b4ff, #00e5cc)",
    dark: "linear-gradient(120deg, #0044cc, #0088cc, #00aa99)"
  }
};

export const HeroSection = ({
  category = "home",
  title,
  description,
  icon,
  children,
  className,
  showBackgroundImage = true
}: HeroSectionProps) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode (browser only)
  useEffect(() => {
    if (!isBrowser || !safeDocument) return;
    
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Listen for calculate pulse events (browser only)
  useEffect(() => {
    if (!isBrowser || !safeWindow) return;
    
    const handlePulse = () => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 600);
    };

    window.addEventListener('calculatePulse', handlePulse);
    return () => window.removeEventListener('calculatePulse', handlePulse);
  }, []);

  // Normalize category for gradient lookup
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  const gradientConfig = gradients[normalizedCategory] || gradients.home;
  const gradient = isDark ? gradientConfig.dark : gradientConfig.light;
  const imageConfig = categoryImages[normalizedCategory] || categoryImages.home;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    if (!isBrowser) return;
    const img = new Image();
    img.src = imageConfig.image;
    img.onload = () => setImageLoaded(true);
  }, [imageConfig.image]);

  return (
    <section
      data-category={normalizedCategory}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: imageConfig.fallback,
        filter: isPulsing ? "brightness(1.08)" : isHovered ? "brightness(1.03)" : isDark ? "brightness(0.9)" : "brightness(1)",
        transition: "filter 0.3s ease"
      }}
      className={cn(
        "relative overflow-hidden min-h-[200px] py-16",
        className
      )}
    >
      {/* Blurred background image with fade-in */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${imageConfig.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          transform: "scale(1.05)",
          opacity: imageLoaded ? 1 : 0
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div 
        className="absolute inset-0 z-[1] bg-black/40"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {icon && (
            <div 
              className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-scale-in"
              style={{ color: "#ffffff", filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }}
            >
              {icon}
            </div>
          )}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up"
            style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }}
          >
            {title}
          </h1>
          {description && (
            <p 
              className="text-lg md:text-xl leading-relaxed animate-fade-in-up"
              style={{ color: "rgba(255, 255, 255, 0.95)", textShadow: "0 1px 4px rgba(0, 0, 0, 0.3)", animationDelay: "0.1s" }}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
