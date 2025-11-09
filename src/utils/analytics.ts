// Google Analytics 4 Integration
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Check if gtag is already loaded
  if (window.gtag) return;

  // Create script tag
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track calculator usage
export const trackCalculatorUse = (calculatorName: string, category: string) => {
  trackEvent('calculator_use', 'Calculators', calculatorName);
  trackEvent('category_use', 'Categories', category);
};

// Track search
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'Search', searchTerm);
};

// Track outbound links
export const trackOutboundLink = (url: string) => {
  trackEvent('click', 'Outbound Link', url);
};
