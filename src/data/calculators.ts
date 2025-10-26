import { Calculator, Heart, Percent, Ruler, DollarSign, Activity, TrendingUp, Scale, Receipt, Target, TrendingDown, Banknote, CreditCard, Car } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface CalculatorData {
  id: string;
  title: string;
  description: string;
  category: "finance" | "health" | "math" | "conversion";
  icon: LucideIcon;
  path: string;
  seoTitle: string;
  seoDescription: string;
}

export const calculators: CalculatorData[] = [
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and check if you're in a healthy weight range",
    category: "health",
    icon: Heart,
    path: "/calculator/bmi",
    seoTitle: "BMI Calculator - Calculate Your Body Mass Index | SmartCalc Hub",
    seoDescription: "Free BMI calculator to check your body mass index. Enter your height and weight to get instant results and health recommendations."
  },
  {
    id: "loan",
    title: "Loan Calculator",
    description: "Calculate monthly payments, total interest, and amortization for any loan",
    category: "finance",
    icon: DollarSign,
    path: "/calculator/loan",
    seoTitle: "Loan Calculator - Calculate Monthly Payments & Interest | SmartCalc Hub",
    seoDescription: "Free loan calculator to calculate monthly payments, total interest, and loan amortization. Plan your finances with accurate loan estimates."
  },
  {
    id: "percentage",
    title: "Percentage Calculator",
    description: "Calculate percentages, percentage increase/decrease, and percentage of a number",
    category: "math",
    icon: Percent,
    path: "/calculator/percentage",
    seoTitle: "Percentage Calculator - Calculate Percentages Easily | SmartCalc Hub",
    seoDescription: "Free percentage calculator for all your percentage calculations. Find percentages, percentage changes, and percentage of numbers instantly."
  },
  {
    id: "length",
    title: "Length Converter",
    description: "Convert between meters, feet, inches, kilometers, miles, and more",
    category: "conversion",
    icon: Ruler,
    path: "/calculator/length",
    seoTitle: "Length Converter - Convert Units of Length | SmartCalc Hub",
    seoDescription: "Free length converter to convert between meters, feet, inches, kilometers, miles and more. Accurate unit conversion made simple."
  },
  // Placeholder for future calculators
  {
    id: "mortgage",
    title: "Mortgage Calculator",
    description: "Calculate mortgage payments with taxes and insurance",
    category: "finance",
    icon: TrendingUp,
    path: "/calculator/mortgage",
    seoTitle: "Mortgage Calculator - Calculate Home Loan Payments | SmartCalc Hub",
    seoDescription: "Free mortgage calculator to estimate your monthly home loan payments including principal, interest, taxes, and insurance."
  },
  {
    id: "bmr",
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate and daily calorie needs",
    category: "health",
    icon: Activity,
    path: "/calculator/bmr",
    seoTitle: "BMR Calculator - Calculate Basal Metabolic Rate | SmartCalc Hub",
    seoDescription: "Free BMR calculator to find your basal metabolic rate and daily calorie requirements based on your age, weight, height, and activity level."
  },
  {
    id: "weight",
    title: "Weight Converter",
    description: "Convert between kilograms, pounds, ounces, and more",
    category: "conversion",
    icon: Scale,
    path: "/calculator/weight",
    seoTitle: "Weight Converter - Convert Units of Weight | SmartCalc Hub",
    seoDescription: "Free weight converter to convert between kilograms, pounds, ounces, grams and more. Quick and accurate weight conversions."
  },
  {
    id: "compound-interest",
    title: "Compound Interest",
    description: "Calculate compound interest and investment growth",
    category: "finance",
    icon: Calculator,
    path: "/calculator/compound-interest",
    seoTitle: "Compound Interest Calculator - Calculate Investment Growth | SmartCalc Hub",
    seoDescription: "Free compound interest calculator to see how your investments grow over time with compound interest calculations."
  },
  {
    id: "tax",
    title: "Tax Calculator",
    description: "Calculate income tax based on earnings and deductions",
    category: "finance",
    icon: Receipt,
    path: "/calculator/tax",
    seoTitle: "Tax Calculator - Calculate Income Tax | SmartCalc Hub",
    seoDescription: "Free tax calculator to estimate your income tax liability based on your earnings, tax rate, and deductions."
  },
  {
    id: "savings-goal",
    title: "Savings Goal Calculator",
    description: "Calculate how long it will take to reach your savings goal",
    category: "finance",
    icon: Target,
    path: "/calculator/savings-goal",
    seoTitle: "Savings Goal Calculator - Plan Your Financial Goals | SmartCalc Hub",
    seoDescription: "Free savings goal calculator to determine how long it takes to reach your savings target with regular contributions."
  },
  {
    id: "investment-return",
    title: "Investment Return",
    description: "Calculate ROI and annual returns on investments",
    category: "finance",
    icon: TrendingDown,
    path: "/calculator/investment-return",
    seoTitle: "Investment Return Calculator - Calculate ROI | SmartCalc Hub",
    seoDescription: "Free investment return calculator to analyze your ROI, total returns, and annualized performance."
  },
  {
    id: "currency",
    title: "Currency Converter",
    description: "Convert between major world currencies",
    category: "conversion",
    icon: Banknote,
    path: "/calculator/currency",
    seoTitle: "Currency Converter - Convert World Currencies | SmartCalc Hub",
    seoDescription: "Free currency converter for major world currencies. Quick and easy currency conversion with sample rates."
  },
  {
    id: "credit-card",
    title: "Credit Card Payoff",
    description: "Calculate how long to pay off credit card debt",
    category: "finance",
    icon: CreditCard,
    path: "/calculator/credit-card",
    seoTitle: "Credit Card Payoff Calculator - Debt Freedom Timeline | SmartCalc Hub",
    seoDescription: "Free credit card payoff calculator to see how long it takes to eliminate debt and how much interest you'll pay."
  },
  {
    id: "car-loan",
    title: "Car Loan Calculator",
    description: "Calculate monthly payments for auto loans",
    category: "finance",
    icon: Car,
    path: "/calculator/car-loan",
    seoTitle: "Car Loan Calculator - Auto Loan Payments | SmartCalc Hub",
    seoDescription: "Free car loan calculator to estimate monthly payments, total interest, and overall cost of your auto loan."
  }
];

export const getCalculatorsByCategory = (category: string) => {
  return calculators.filter(calc => calc.category === category);
};

export const getCalculatorById = (id: string) => {
  return calculators.find(calc => calc.id === id);
};

export const categories = [
  { id: "finance", name: "Finance", icon: DollarSign, color: "text-green-600 dark:text-green-400" },
  { id: "health", name: "Health", icon: Heart, color: "text-red-600 dark:text-red-400" },
  { id: "math", name: "Math", icon: Calculator, color: "text-blue-600 dark:text-blue-400" },
  { id: "conversion", name: "Conversion", icon: Ruler, color: "text-purple-600 dark:text-purple-400" }
];
