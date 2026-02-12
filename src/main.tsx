import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGA } from '@/utils/analytics';

// Initialize Google Analytics in production
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  initGA();
}

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
