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
import MortgageCalculator from "./pages/calculators/MortgageCalculator";
import CompoundInterestCalculator from "./pages/calculators/CompoundInterestCalculator";
import BMRCalculator from "./pages/calculators/BMRCalculator";
import WeightConverter from "./pages/calculators/WeightConverter";
import TaxCalculator from "./pages/calculators/TaxCalculator";
import SavingsGoalCalculator from "./pages/calculators/SavingsGoalCalculator";
import InvestmentReturnCalculator from "./pages/calculators/InvestmentReturnCalculator";
import CurrencyConverter from "./pages/calculators/CurrencyConverter";
import CreditCardPayoffCalculator from "./pages/calculators/CreditCardPayoffCalculator";
import CarLoanCalculator from "./pages/calculators/CarLoanCalculator";
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
        <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
        <Route path="/calculator/compound-interest" element={<CompoundInterestCalculator />} />
        <Route path="/calculator/bmr" element={<BMRCalculator />} />
        <Route path="/calculator/weight" element={<WeightConverter />} />
        <Route path="/calculator/tax" element={<TaxCalculator />} />
        <Route path="/calculator/savings-goal" element={<SavingsGoalCalculator />} />
        <Route path="/calculator/investment-return" element={<InvestmentReturnCalculator />} />
        <Route path="/calculator/currency" element={<CurrencyConverter />} />
        <Route path="/calculator/credit-card" element={<CreditCardPayoffCalculator />} />
        <Route path="/calculator/car-loan" element={<CarLoanCalculator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
