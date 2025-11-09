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
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
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
import CalorieCalculator from "./pages/calculators/CalorieCalculator";
import IdealWeightCalculator from "./pages/calculators/IdealWeightCalculator";
import BodyFatCalculator from "./pages/calculators/BodyFatCalculator";
import WaterIntakeCalculator from "./pages/calculators/WaterIntakeCalculator";
import PregnancyCalculator from "./pages/calculators/PregnancyCalculator";
import HeartRateCalculator from "./pages/calculators/HeartRateCalculator";
import MacroCalculator from "./pages/calculators/MacroCalculator";
import ProteinCalculator from "./pages/calculators/ProteinCalculator";
import AverageCalculator from "./pages/calculators/AverageCalculator";
import RatioCalculator from "./pages/calculators/RatioCalculator";
import FractionCalculator from "./pages/calculators/FractionCalculator";
import AgeCalculator from "./pages/calculators/AgeCalculator";
import TemperatureConverter from "./pages/calculators/TemperatureConverter";
import RetirementCalculator from "./pages/calculators/RetirementCalculator";
import InflationCalculator from "./pages/calculators/InflationCalculator";
import LTVCalculator from "./pages/calculators/LTVCalculator";
import BreakEvenCalculator from "./pages/calculators/BreakEvenCalculator";
import DebtToIncomeCalculator from "./pages/calculators/DebtToIncomeCalculator";
import BloodPressureCalculator from "./pages/calculators/BloodPressureCalculator";
import SleepCalculator from "./pages/calculators/SleepCalculator";
import StepsCalculator from "./pages/calculators/StepsCalculator";
import BasalTempCalculator from "./pages/calculators/BasalTempCalculator";
import MenstrualCalculator from "./pages/calculators/MenstrualCalculator";
import QuadraticCalculator from "./pages/calculators/QuadraticCalculator";
import PercentageChangeCalculator from "./pages/calculators/PercentageChangeCalculator";
import AreaPerimeterCalculator from "./pages/calculators/AreaPerimeterCalculator";
import VolumeCalculator from "./pages/calculators/VolumeCalculator";
import PrimeNumberCalculator from "./pages/calculators/PrimeNumberCalculator";
import ProfitMarginCalculator from "./pages/calculators/ProfitMarginCalculator";
import TimezoneConverter from "./pages/calculators/TimezoneConverter";
import SimpleInterestCalculator from "./pages/calculators/SimpleInterestCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import DiscountCalculator from "./pages/calculators/DiscountCalculator";
import TDEECalculator from "./pages/calculators/TDEECalculator";
import SquareRootCalculator from "./pages/calculators/SquareRootCalculator";
import SineCalculator from "./pages/calculators/SineCalculator";
import CosineCalculator from "./pages/calculators/CosineCalculator";
import FactorialCalculator from "./pages/calculators/FactorialCalculator";
import AreaConverter from "./pages/calculators/AreaConverter";
import SpeedConverter from "./pages/calculators/SpeedConverter";
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
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
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
        <Route path="/calculator/calorie" element={<CalorieCalculator />} />
        <Route path="/calculator/ideal-weight" element={<IdealWeightCalculator />} />
        <Route path="/calculator/body-fat" element={<BodyFatCalculator />} />
        <Route path="/calculator/water" element={<WaterIntakeCalculator />} />
        <Route path="/calculator/pregnancy" element={<PregnancyCalculator />} />
        <Route path="/calculator/heart-rate" element={<HeartRateCalculator />} />
        <Route path="/calculator/macro" element={<MacroCalculator />} />
        <Route path="/calculator/protein" element={<ProteinCalculator />} />
        <Route path="/calculator/average" element={<AverageCalculator />} />
        <Route path="/calculator/ratio" element={<RatioCalculator />} />
        <Route path="/calculator/fraction" element={<FractionCalculator />} />
            <Route path="/calculator/age" element={<AgeCalculator />} />
            <Route path="/calculator/temperature" element={<TemperatureConverter />} />
            <Route path="/calculator/retirement" element={<RetirementCalculator />} />
            <Route path="/calculator/inflation" element={<InflationCalculator />} />
            <Route path="/calculator/ltv" element={<LTVCalculator />} />
            <Route path="/calculator/break-even" element={<BreakEvenCalculator />} />
            <Route path="/calculator/debt-to-income" element={<DebtToIncomeCalculator />} />
            <Route path="/calculator/blood-pressure" element={<BloodPressureCalculator />} />
            <Route path="/calculator/sleep" element={<SleepCalculator />} />
            <Route path="/calculator/steps" element={<StepsCalculator />} />
            <Route path="/calculator/basal-temp" element={<BasalTempCalculator />} />
            <Route path="/calculator/menstrual" element={<MenstrualCalculator />} />
            <Route path="/calculator/quadratic" element={<QuadraticCalculator />} />
            <Route path="/calculator/percentage-change" element={<PercentageChangeCalculator />} />
            <Route path="/calculator/area-perimeter" element={<AreaPerimeterCalculator />} />
            <Route path="/calculator/volume" element={<VolumeCalculator />} />
            <Route path="/calculator/prime" element={<PrimeNumberCalculator />} />
            <Route path="/calculator/profit-margin" element={<ProfitMarginCalculator />} />
            <Route path="/calculator/timezone" element={<TimezoneConverter />} />
            <Route path="/calculator/simple-interest" element={<SimpleInterestCalculator />} />
            <Route path="/calculator/emi" element={<EMICalculator />} />
            <Route path="/calculator/discount" element={<DiscountCalculator />} />
            <Route path="/calculator/tdee" element={<TDEECalculator />} />
            <Route path="/calculator/square-root" element={<SquareRootCalculator />} />
            <Route path="/calculator/sine" element={<SineCalculator />} />
            <Route path="/calculator/cosine" element={<CosineCalculator />} />
            <Route path="/calculator/factorial" element={<FactorialCalculator />} />
            <Route path="/calculator/area-converter" element={<AreaConverter />} />
            <Route path="/calculator/speed-converter" element={<SpeedConverter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
