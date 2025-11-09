import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { initGA } from '@/utils/analytics';

// Initialize Google Analytics in production
if (import.meta.env.PROD) {
  initGA();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="smartcalc-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
