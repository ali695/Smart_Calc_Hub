import { Calculator, Heart, Percent, Ruler, DollarSign, Activity, TrendingUp, Scale, Receipt, Target, TrendingDown, Banknote, CreditCard, Car, Utensils, Weight, Droplet, Baby, HeartPulse, Apple, Beef, BarChart3, Divide, Calendar, ThermometerSun } from "lucide-react";
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
    id: "calorie",
    title: "Calorie Calculator",
    description: "Calculate daily calorie needs for weight goals",
    category: "health",
    icon: Utensils,
    path: "/calculator/calorie",
    seoTitle: "Calorie Calculator - Daily Calorie Needs | SmartCalc Hub",
    seoDescription: "Calculate your daily calorie requirements for weight loss, maintenance, or muscle gain."
  },
  {
    id: "ideal-weight",
    title: "Ideal Weight Calculator",
    description: "Find your ideal body weight range",
    category: "health",
    icon: Weight,
    path: "/calculator/ideal-weight",
    seoTitle: "Ideal Weight Calculator | SmartCalc Hub",
    seoDescription: "Calculate your ideal body weight using multiple scientific formulas."
  },
  {
    id: "body-fat",
    title: "Body Fat Calculator",
    description: "Estimate body fat percentage",
    category: "health",
    icon: Activity,
    path: "/calculator/body-fat",
    seoTitle: "Body Fat Calculator | SmartCalc Hub",
    seoDescription: "Calculate body fat percentage using the U.S. Navy method."
  },
  {
    id: "water",
    title: "Water Intake Calculator",
    description: "Calculate daily water needs",
    category: "health",
    icon: Droplet,
    path: "/calculator/water",
    seoTitle: "Water Intake Calculator | SmartCalc Hub",
    seoDescription: "Find out how much water you should drink daily."
  },
  {
    id: "pregnancy",
    title: "Pregnancy Due Date",
    description: "Calculate your due date",
    category: "health",
    icon: Baby,
    path: "/calculator/pregnancy",
    seoTitle: "Pregnancy Calculator | SmartCalc Hub",
    seoDescription: "Calculate your pregnancy due date and weeks pregnant."
  },
  {
    id: "heart-rate",
    title: "Heart Rate Zones",
    description: "Find your training heart rate zones",
    category: "health",
    icon: HeartPulse,
    path: "/calculator/heart-rate",
    seoTitle: "Heart Rate Zone Calculator | SmartCalc Hub",
    seoDescription: "Calculate optimal heart rate zones for different workout intensities."
  },
  {
    id: "macro",
    title: "Macro Calculator",
    description: "Calculate protein, carbs, and fat",
    category: "health",
    icon: Apple,
    path: "/calculator/macro",
    seoTitle: "Macro Calculator | SmartCalc Hub",
    seoDescription: "Calculate optimal macronutrient distribution for your goals."
  },
  {
    id: "protein",
    title: "Protein Calculator",
    description: "Daily protein requirements",
    category: "health",
    icon: Beef,
    path: "/calculator/protein",
    seoTitle: "Protein Calculator | SmartCalc Hub",
    seoDescription: "Calculate your daily protein needs based on goals and activity."
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
    id: "temperature",
    title: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, Kelvin",
    category: "conversion",
    icon: ThermometerSun,
    path: "/calculator/temperature",
    seoTitle: "Temperature Converter | SmartCalc Hub",
    seoDescription: "Convert between Celsius, Fahrenheit, and Kelvin instantly."
  },
  {
    id: "average",
    title: "Average Calculator",
    description: "Calculate mean, median, mode",
    category: "math",
    icon: BarChart3,
    path: "/calculator/average",
    seoTitle: "Average Calculator | SmartCalc Hub",
    seoDescription: "Calculate mean, median, and mode of numbers."
  },
  {
    id: "ratio",
    title: "Ratio Calculator",
    description: "Simplify and compare ratios",
    category: "math",
    icon: Divide,
    path: "/calculator/ratio",
    seoTitle: "Ratio Calculator | SmartCalc Hub",
    seoDescription: "Simplify ratios and convert between formats."
  },
  {
    id: "fraction",
    title: "Fraction Calculator",
    description: "Add, subtract, multiply, divide fractions",
    category: "math",
    icon: Calculator,
    path: "/calculator/fraction",
    seoTitle: "Fraction Calculator | SmartCalc Hub",
    seoDescription: "Perform operations on fractions with automatic simplification."
  },
  {
    id: "age",
    title: "Age Calculator",
    description: "Calculate exact age from birth date",
    category: "math",
    icon: Calendar,
    path: "/calculator/age",
    seoTitle: "Age Calculator | SmartCalc Hub",
    seoDescription: "Calculate your exact age in years, months, and days."
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
