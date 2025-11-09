import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
          accent: "hsl(var(--primary-accent))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        finance: "hsl(var(--finance-accent))",
        health: "hsl(var(--health-accent))",
        math: "hsl(var(--math-accent))",
        conversion: "hsl(var(--conversion-accent))",
        tech: "hsl(var(--tech-accent))",
        engineering: "hsl(var(--engineering-accent))",
        business: "hsl(var(--business-accent))",
        science: "hsl(var(--science-accent))",
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-hover': 'var(--gradient-hover)',
        'gradient-home': 'linear-gradient(120deg, #0040ff, #00aaff, #00ffcc)',
        'gradient-finance': 'linear-gradient(120deg, #001133, #004466, #00b3b3)',
        'gradient-health': 'linear-gradient(120deg, #ff007a, #ff4da6, #ff99cc)',
        'gradient-math': 'linear-gradient(120deg, #551A8B, #7B2CBF, #A855F7)',
        'gradient-conversion': 'linear-gradient(120deg, #6A00F4, #00D4FF, #00FFA3)',
        'gradient-blog': 'linear-gradient(120deg, #00111A, #002C47, #004F71)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
        'glow': 'var(--shadow-glow)',
        'glass': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'neon': '0 0 20px rgba(0, 196, 255, 0.6)',
        'neon-hover': '0 0 30px rgba(0, 196, 255, 0.8)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "16px",
        "2xl": "20px",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(195 100% 50% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(195 100% 50% / 0.6)" },
        },
        "lift-up": {
          "0%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(-6px) scale(1.02)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "lift-up": "lift-up 0.3s ease forwards",
      },
      transitionProperty: {
        'smooth': 'var(--transition-smooth)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
