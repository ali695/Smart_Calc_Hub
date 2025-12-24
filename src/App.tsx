import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { useEffect } from "react";
import { trackPageView } from "@/utils/analytics";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogGenerator from "./pages/BlogGenerator";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
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
import TangentCalculator from "./pages/calculators/TangentCalculator";
import LogarithmCalculator from "./pages/calculators/LogarithmCalculator";
import ExponentCalculator from "./pages/calculators/ExponentCalculator";
import TriangleAreaCalculator from "./pages/calculators/TriangleAreaCalculator";
import CircleCalculator from "./pages/calculators/CircleCalculator";
import PythagorasCalculator from "./pages/calculators/PythagorasCalculator";
import PermutationCombinationCalculator from "./pages/calculators/PermutationCombinationCalculator";
import CalorieDeficitCalculator from "./pages/calculators/CalorieDeficitCalculator";
import PressureConverter from "./pages/calculators/PressureConverter";
import NetWorthCalculator from "./pages/calculators/NetWorthCalculator";
import ArcsinCalculator from "./pages/calculators/ArcsinCalculator";
import ArccosCalculator from "./pages/calculators/ArccosCalculator";
import ArctanCalculator from "./pages/calculators/ArctanCalculator";
import RadianDegreeConverter from "./pages/calculators/RadianDegreeConverter";
import ScientificNotationCalculator from "./pages/calculators/ScientificNotationCalculator";
import BudgetPlannerCalculator from "./pages/calculators/BudgetPlannerCalculator";
import SalaryAfterTaxCalculator from "./pages/calculators/SalaryAfterTaxCalculator";
import WaistToHeightCalculator from "./pages/calculators/WaistToHeightCalculator";
import BodySurfaceAreaCalculator from "./pages/calculators/BodySurfaceAreaCalculator";
import EnergyConverter from "./pages/calculators/EnergyConverter";
import HashGeneratorCalculator from "./pages/calculators/HashGeneratorCalculator";
import Base64Calculator from "./pages/calculators/Base64Calculator";
import JsonFormatterCalculator from "./pages/calculators/JsonFormatterCalculator";
import OhmsLawCalculator from "./pages/calculators/OhmsLawCalculator";
import ForceCalculator from "./pages/calculators/ForceCalculator";
import TorqueCalculator from "./pages/calculators/TorqueCalculator";
import PowerCalculator from "./pages/calculators/PowerCalculator";
import PhCalculator from "./pages/calculators/PhCalculator";
import MolarityCalculator from "./pages/calculators/MolarityCalculator";
import HalfLifeCalculator from "./pages/calculators/HalfLifeCalculator";
import DensityCalculator from "./pages/calculators/DensityCalculator";
import KineticEnergyCalculator from "./pages/calculators/KineticEnergyCalculator";
import ColorConverterCalculator from "./pages/calculators/ColorConverterCalculator";
import PasswordGeneratorCalculator from "./pages/calculators/PasswordGeneratorCalculator";
import GrowthRateCalculator from "./pages/calculators/GrowthRateCalculator";
import CustomerLifetimeValueCalculator from "./pages/calculators/CustomerLifetimeValueCalculator";
import ConversionRateCalculator from "./pages/calculators/ConversionRateCalculator";
import PaybackPeriodCalculator from "./pages/calculators/PaybackPeriodCalculator";
import StressStrainCalculator from "./pages/calculators/StressStrainCalculator";
import InventoryTurnoverCalculator from "./pages/calculators/InventoryTurnoverCalculator";
import FuelEfficiencyCalculator from "./pages/calculators/FuelEfficiencyCalculator";
import DataTransferCalculator from "./pages/calculators/DataTransferCalculator";
import USIncomeTaxCalculator from "./pages/calculators/USIncomeTaxCalculator";
import UKIncomeTaxCalculator from "./pages/calculators/UKIncomeTaxCalculator";
import CanadaIncomeTaxCalculator from "./pages/calculators/CanadaIncomeTaxCalculator";
import AustraliaIncomeTaxCalculator from "./pages/calculators/AustraliaIncomeTaxCalculator";
import IndiaIncomeTaxCalculator from "./pages/calculators/IndiaIncomeTaxCalculator";
import PaycheckCalculator from "./pages/calculators/PaycheckCalculator";
import MortgageRecastCalculator from "./pages/calculators/MortgageRecastCalculator";
import RefinanceCalculator from "./pages/calculators/RefinanceCalculator";
import PercentageIncreaseCalculator from "./pages/calculators/PercentageIncreaseCalculator";
import PercentageDecreaseCalculator from "./pages/calculators/PercentageDecreaseCalculator";
import FractionDecimalCalculator from "./pages/calculators/FractionDecimalCalculator";
import StandardDeviationCalculator from "./pages/calculators/StandardDeviationCalculator";
import ProbabilityCalculator from "./pages/calculators/ProbabilityCalculator";
import OneRepMaxCalculator from "./pages/calculators/OneRepMaxCalculator";
import BinaryDecimalCalculator from "./pages/calculators/BinaryDecimalCalculator";
import HexDecimalCalculator from "./pages/calculators/HexDecimalCalculator";
import DaysCalculator from "./pages/calculators/DaysCalculator";
import RentAffordabilityCalculator from "./pages/calculators/RentAffordabilityCalculator";
import CryptoProfitCalculator from "./pages/calculators/CryptoProfitCalculator";
import RomanNumeralCalculator from "./pages/calculators/RomanNumeralCalculator";
import CountdownCalculator from "./pages/calculators/CountdownCalculator";
import BuyVsRentCalculator from "./pages/calculators/BuyVsRentCalculator";
import CapRateCalculator from "./pages/calculators/CapRateCalculator";
import PropertyTaxCalculator from "./pages/calculators/PropertyTaxCalculator";
import HouseFlipCalculator from "./pages/calculators/HouseFlipCalculator";
import DCACalculator from "./pages/calculators/DCACalculator";
import BitcoinConverter from "./pages/calculators/BitcoinConverter";
import MiningProfitCalculator from "./pages/calculators/MiningProfitCalculator";
import NationalInsuranceCalculator from "./pages/calculators/NationalInsuranceCalculator";
import StampDutyCalculator from "./pages/calculators/StampDutyCalculator";
import SocialSecurityCalculator from "./pages/calculators/SocialSecurityCalculator";
import RothIRACalculator from "./pages/calculators/RothIRACalculator";
import SalesTaxCalculator from "./pages/calculators/SalesTaxCalculator";
import K401Calculator from "./pages/calculators/K401Calculator";
import RealEstateCalculators from "./pages/RealEstateCalculators";
import CryptoCalculators from "./pages/CryptoCalculators";
import AdminDashboard from "./pages/AdminDashboard";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Analytics tracker component - only runs in browser
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change in production (browser only)
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RegionProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
            <AnalyticsTracker />
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/real-estate" element={<RealEstateCalculators />} />
                <Route path="/crypto" element={<CryptoCalculators />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog-generator" element={<BlogGenerator />} />
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
              <Route path="/calculator/fuel" element={<FuelEfficiencyCalculator />} />
              <Route path="/calculator/data-transfer" element={<DataTransferCalculator />} />
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
              <Route path="/calculator/tangent" element={<TangentCalculator />} />
              <Route path="/calculator/logarithm" element={<LogarithmCalculator />} />
              <Route path="/calculator/exponent" element={<ExponentCalculator />} />
              <Route path="/calculator/triangle-area" element={<TriangleAreaCalculator />} />
              <Route path="/calculator/circle" element={<CircleCalculator />} />
              <Route path="/calculator/pythagoras" element={<PythagorasCalculator />} />
              <Route path="/calculator/permutation-combination" element={<PermutationCombinationCalculator />} />
              <Route path="/calculator/calorie-deficit" element={<CalorieDeficitCalculator />} />
              <Route path="/calculator/pressure-converter" element={<PressureConverter />} />
              <Route path="/calculator/net-worth" element={<NetWorthCalculator />} />
              <Route path="/calculator/arcsin" element={<ArcsinCalculator />} />
              <Route path="/calculator/arccos" element={<ArccosCalculator />} />
              <Route path="/calculator/arctan" element={<ArctanCalculator />} />
              <Route path="/calculator/radian-degree" element={<RadianDegreeConverter />} />
              <Route path="/calculator/scientific-notation" element={<ScientificNotationCalculator />} />
              <Route path="/calculator/budget-planner" element={<BudgetPlannerCalculator />} />
              <Route path="/calculator/salary-after-tax" element={<SalaryAfterTaxCalculator />} />
              <Route path="/calculator/waist-to-height" element={<WaistToHeightCalculator />} />
              <Route path="/calculator/body-surface-area" element={<BodySurfaceAreaCalculator />} />
              <Route path="/calculator/energy-converter" element={<EnergyConverter />} />
              <Route path="/calculator/hash-generator" element={<HashGeneratorCalculator />} />
              <Route path="/calculator/base64-encoder" element={<Base64Calculator />} />
              <Route path="/calculator/json-formatter" element={<JsonFormatterCalculator />} />
              <Route path="/calculator/ohms-law" element={<OhmsLawCalculator />} />
              <Route path="/calculator/force" element={<ForceCalculator />} />
              <Route path="/calculator/torque" element={<TorqueCalculator />} />
              <Route path="/calculator/power" element={<PowerCalculator />} />
              <Route path="/calculator/ph" element={<PhCalculator />} />
              <Route path="/calculator/molarity" element={<MolarityCalculator />} />
              <Route path="/calculator/molarity-calculator" element={<MolarityCalculator />} />
              <Route path="/calculator/half-life" element={<HalfLifeCalculator />} />
              <Route path="/calculator/density" element={<DensityCalculator />} />
              <Route path="/calculator/density-calculator" element={<DensityCalculator />} />
              <Route path="/calculator/kinetic-energy" element={<KineticEnergyCalculator />} />
              <Route path="/calculator/color-converter" element={<ColorConverterCalculator />} />
              <Route path="/calculator/password-generator" element={<PasswordGeneratorCalculator />} />
              <Route path="/calculator/growth-rate" element={<GrowthRateCalculator />} />
              <Route path="/calculator/customer-lifetime-value" element={<CustomerLifetimeValueCalculator />} />
              <Route path="/calculator/conversion-rate" element={<ConversionRateCalculator />} />
              <Route path="/calculator/payback-period" element={<PaybackPeriodCalculator />} />
              <Route path="/calculator/stress-strain" element={<StressStrainCalculator />} />
              <Route path="/calculator/inventory-turnover" element={<InventoryTurnoverCalculator />} />
              <Route path="/calculator/us-income-tax" element={<USIncomeTaxCalculator />} />
              <Route path="/calculator/uk-income-tax" element={<UKIncomeTaxCalculator />} />
              <Route path="/calculator/canada-income-tax" element={<CanadaIncomeTaxCalculator />} />
              <Route path="/calculator/australia-income-tax" element={<AustraliaIncomeTaxCalculator />} />
              <Route path="/calculator/india-income-tax" element={<IndiaIncomeTaxCalculator />} />
              <Route path="/calculator/paycheck" element={<PaycheckCalculator />} />
              <Route path="/calculator/mortgage-recast" element={<MortgageRecastCalculator />} />
              <Route path="/calculator/refinance" element={<RefinanceCalculator />} />
              <Route path="/calculator/percentage-increase" element={<PercentageIncreaseCalculator />} />
              <Route path="/calculator/percentage-decrease" element={<PercentageDecreaseCalculator />} />
              <Route path="/calculator/fraction-decimal" element={<FractionDecimalCalculator />} />
              <Route path="/calculator/standard-deviation" element={<StandardDeviationCalculator />} />
              <Route path="/calculator/probability" element={<ProbabilityCalculator />} />
              <Route path="/calculator/one-rep-max" element={<OneRepMaxCalculator />} />
              <Route path="/calculator/binary-decimal" element={<BinaryDecimalCalculator />} />
              <Route path="/calculator/hex-decimal" element={<HexDecimalCalculator />} />
              <Route path="/calculator/days" element={<DaysCalculator />} />
              <Route path="/calculator/rent-affordability" element={<RentAffordabilityCalculator />} />
              <Route path="/calculator/crypto-profit" element={<CryptoProfitCalculator />} />
              <Route path="/calculator/roman-numeral" element={<RomanNumeralCalculator />} />
              <Route path="/calculator/countdown" element={<CountdownCalculator />} />
              <Route path="/calculator/buy-vs-rent" element={<BuyVsRentCalculator />} />
              <Route path="/calculator/cap-rate" element={<CapRateCalculator />} />
              <Route path="/calculator/property-tax" element={<PropertyTaxCalculator />} />
              <Route path="/calculator/house-flip" element={<HouseFlipCalculator />} />
              <Route path="/calculator/dca" element={<DCACalculator />} />
              <Route path="/calculator/bitcoin-converter" element={<BitcoinConverter />} />
              <Route path="/calculator/mining-profit" element={<MiningProfitCalculator />} />
              <Route path="/calculator/national-insurance" element={<NationalInsuranceCalculator />} />
              <Route path="/calculator/stamp-duty" element={<StampDutyCalculator />} />
              <Route path="/calculator/social-security" element={<SocialSecurityCalculator />} />
              <Route path="/calculator/roth-ira" element={<RothIRACalculator />} />
              <Route path="/calculator/sales-tax" element={<SalesTaxCalculator />} />
              <Route path="/calculator/401k" element={<K401Calculator />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
      </RegionProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
