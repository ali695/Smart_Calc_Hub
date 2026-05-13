import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGA } from '@/utils/analytics';

// Initialize Google Analytics in production
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  initGA();
}

const rootElement = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// If pre-rendered HTML is present, hydrate; otherwise mount fresh (dev / SPA fallback).
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}
