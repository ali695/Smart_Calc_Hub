import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
}

// Create a global event for calculate pulse
export const triggerCalculatePulse = () => {
  window.dispatchEvent(new CustomEvent('calculatePulse'));
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
  className
}: HeroSectionProps) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Listen for calculate pulse events
  useEffect(() => {
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

  return (
    <section
      data-category={normalizedCategory}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: gradient,
        backgroundSize: "200% 200%",
        animation: "heroGradientFlow 10s ease infinite",
        filter: isPulsing ? "brightness(1.08)" : isHovered ? "brightness(1.03)" : isDark ? "brightness(0.9)" : "brightness(1)",
        transition: "filter 0.3s ease"
      }}
      className={cn(
        "relative overflow-hidden min-h-[200px] py-16",
        className
      )}
    >
      {/* Radial lighting overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.12), transparent 70%)"
        }}
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
