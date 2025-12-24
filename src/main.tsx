import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { initGA } from '@/utils/analytics';

// Initialize Google Analytics in production (client-side only)
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  initGA();
}

const rootElement = document.getElementById("root")!;

const AppWithProviders = (
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="smartcalc-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Use hydration if the page was pre-rendered by react-snap
// Check if root has children (pre-rendered HTML exists)
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, AppWithProviders);
} else {
  createRoot(rootElement).render(AppWithProviders);
}
