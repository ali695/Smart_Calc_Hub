import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BMICalculator from "./pages/calculators/BMICalculator";
import LoanCalculator from "./pages/calculators/LoanCalculator";
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import LengthConverter from "./pages/calculators/LengthConverter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator/bmi" element={<BMICalculator />} />
            <Route path="/calculator/loan" element={<LoanCalculator />} />
            <Route path="/calculator/percentage" element={<PercentageCalculator />} />
            <Route path="/calculator/length" element={<LengthConverter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
