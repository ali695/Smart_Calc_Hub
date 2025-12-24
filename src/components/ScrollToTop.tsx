import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isBrowser } from "@/utils/ssrGuards";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll in browser environment
    if (!isBrowser) return;
    
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};
