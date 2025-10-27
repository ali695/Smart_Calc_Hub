import { Calculator, Heart, Percent, Ruler, DollarSign, Activity, TrendingUp, Scale, Receipt, Target, TrendingDown, Banknote, CreditCard, Car, Utensils, Weight, Droplet, Baby, HeartPulse, Apple, Beef, BarChart3, Divide, Calendar, ThermometerSun, PiggyBank, TrendingDown as Inflation, Globe, Home, BarChart, Calculator as CalcIcon, Wallet, Heart as BloodPressure, Moon, Footprints, ThermometerIcon, CalendarHeart, TrendingUp as PercentChange, Sigma, Shapes, Cylinder, Hash, ReceiptText, Timer, Fuel, Zap, Map, Wifi, Gauge } from "lucide-react";
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
  },
  // New Finance Calculators
  {
    id: "retirement",
    title: "Retirement Calculator",
    description: "Plan your retirement savings and estimate future wealth",
    category: "finance",
    icon: PiggyBank,
    path: "/calculator/retirement",
    seoTitle: "Retirement Calculator - Plan Your Future | SmartCalc Hub",
    seoDescription: "Free retirement calculator to estimate how much you need to save for a comfortable retirement."
  },
  {
    id: "inflation",
    title: "Inflation Calculator",
    description: "Calculate the impact of inflation on purchasing power",
    category: "finance",
    icon: Inflation,
    path: "/calculator/inflation",
    seoTitle: "Inflation Calculator - Purchasing Power | SmartCalc Hub",
    seoDescription: "Free inflation calculator to see how inflation affects your money over time."
  },
  {
    id: "ltv",
    title: "Loan-to-Value Calculator",
    description: "Calculate LTV ratio for mortgages and loans",
    category: "finance",
    icon: Home,
    path: "/calculator/ltv",
    seoTitle: "LTV Calculator - Loan to Value Ratio | SmartCalc Hub",
    seoDescription: "Free LTV calculator to determine your loan-to-value ratio for mortgages."
  },
  {
    id: "break-even",
    title: "Break-Even Calculator",
    description: "Find your business break-even point",
    category: "finance",
    icon: BarChart,
    path: "/calculator/break-even",
    seoTitle: "Break-Even Calculator - Business Analysis | SmartCalc Hub",
    seoDescription: "Free break-even calculator for business planning and financial analysis."
  },
  {
    id: "debt-to-income",
    title: "Debt-to-Income Calculator",
    description: "Calculate your DTI ratio for loan applications",
    category: "finance",
    icon: Wallet,
    path: "/calculator/debt-to-income",
    seoTitle: "Debt-to-Income Calculator - DTI Ratio | SmartCalc Hub",
    seoDescription: "Free DTI calculator to determine your debt-to-income ratio for mortgage and loan approval."
  },
  // New Health Calculators
  {
    id: "blood-pressure",
    title: "Blood Pressure Checker",
    description: "Check if your blood pressure is in healthy range",
    category: "health",
    icon: BloodPressure,
    path: "/calculator/blood-pressure",
    seoTitle: "Blood Pressure Calculator - Check Your BP | SmartCalc Hub",
    seoDescription: "Free blood pressure checker to determine if your BP is in a healthy range."
  },
  {
    id: "sleep",
    title: "Ideal Sleep Calculator",
    description: "Find your optimal sleep duration and wake time",
    category: "health",
    icon: Moon,
    path: "/calculator/sleep",
    seoTitle: "Sleep Calculator - Optimal Sleep Time | SmartCalc Hub",
    seoDescription: "Free sleep calculator to find your ideal sleep duration and wake-up time."
  },
  {
    id: "steps",
    title: "Daily Step Goal",
    description: "Calculate your daily step goal for fitness",
    category: "health",
    icon: Footprints,
    path: "/calculator/steps",
    seoTitle: "Step Goal Calculator - Daily Steps | SmartCalc Hub",
    seoDescription: "Free step calculator to determine your daily step goal based on fitness level."
  },
  {
    id: "basal-temp",
    title: "Basal Temperature",
    description: "Track basal body temperature for fertility",
    category: "health",
    icon: ThermometerIcon,
    path: "/calculator/basal-temp",
    seoTitle: "Basal Temperature Calculator | SmartCalc Hub",
    seoDescription: "Track your basal body temperature for fertility awareness."
  },
  {
    id: "menstrual",
    title: "Menstrual Cycle",
    description: "Track and predict your menstrual cycle",
    category: "health",
    icon: CalendarHeart,
    path: "/calculator/menstrual",
    seoTitle: "Menstrual Cycle Calculator | SmartCalc Hub",
    seoDescription: "Free menstrual cycle calculator to track and predict your period."
  },
  // New Math Calculators
  {
    id: "quadratic",
    title: "Quadratic Equation",
    description: "Solve quadratic equations step by step",
    category: "math",
    icon: CalcIcon,
    path: "/calculator/quadratic",
    seoTitle: "Quadratic Equation Solver | SmartCalc Hub",
    seoDescription: "Free quadratic equation solver with step-by-step solutions."
  },
  {
    id: "percentage-change",
    title: "Percentage Change",
    description: "Calculate percentage increase or decrease",
    category: "math",
    icon: PercentChange,
    path: "/calculator/percentage-change",
    seoTitle: "Percentage Change Calculator | SmartCalc Hub",
    seoDescription: "Calculate percentage increase or decrease between two values."
  },
  {
    id: "mean-median-mode",
    title: "Mean, Median & Mode",
    description: "Statistical measures calculator",
    category: "math",
    icon: Sigma,
    path: "/calculator/mean-median-mode",
    seoTitle: "Mean Median Mode Calculator | SmartCalc Hub",
    seoDescription: "Calculate mean, median, and mode for any set of numbers."
  },
  {
    id: "area-perimeter",
    title: "Area & Perimeter",
    description: "Calculate area and perimeter of shapes",
    category: "math",
    icon: Shapes,
    path: "/calculator/area-perimeter",
    seoTitle: "Area & Perimeter Calculator | SmartCalc Hub",
    seoDescription: "Calculate area and perimeter for circles, squares, rectangles, and triangles."
  },
  {
    id: "volume",
    title: "Volume Calculator",
    description: "Calculate volume of 3D shapes",
    category: "math",
    icon: Cylinder,
    path: "/calculator/volume",
    seoTitle: "Volume Calculator - 3D Shapes | SmartCalc Hub",
    seoDescription: "Calculate volume for cubes, cylinders, spheres, and cones."
  },
  {
    id: "prime",
    title: "Prime Number Checker",
    description: "Check if a number is prime",
    category: "math",
    icon: Hash,
    path: "/calculator/prime",
    seoTitle: "Prime Number Checker | SmartCalc Hub",
    seoDescription: "Free prime number checker to determine if a number is prime."
  },
  {
    id: "profit-margin",
    title: "Profit Margin",
    description: "Calculate profit margin and markup",
    category: "math",
    icon: ReceiptText,
    path: "/calculator/profit-margin",
    seoTitle: "Profit Margin Calculator | SmartCalc Hub",
    seoDescription: "Calculate profit margin, markup, and revenue for business planning."
  },
  // New Conversion Calculators
  {
    id: "timezone",
    title: "Time Zone Converter",
    description: "Convert time between different time zones",
    category: "conversion",
    icon: Timer,
    path: "/calculator/timezone",
    seoTitle: "Time Zone Converter | SmartCalc Hub",
    seoDescription: "Free time zone converter for global time conversions."
  },
  {
    id: "fuel",
    title: "Fuel Efficiency",
    description: "Convert MPG to L/100km and vice versa",
    category: "conversion",
    icon: Fuel,
    path: "/calculator/fuel",
    seoTitle: "Fuel Efficiency Converter | SmartCalc Hub",
    seoDescription: "Convert between MPG and L/100km for fuel efficiency."
  },
  {
    id: "energy",
    title: "Energy Converter",
    description: "Convert Joules, Calories, kWh, and more",
    category: "conversion",
    icon: Zap,
    path: "/calculator/energy",
    seoTitle: "Energy Unit Converter | SmartCalc Hub",
    seoDescription: "Convert between Joules, Calories, kWh, and other energy units."
  },
  {
    id: "area-unit",
    title: "Area Unit Converter",
    description: "Convert square feet, meters, acres, and more",
    category: "conversion",
    icon: Map,
    path: "/calculator/area-unit",
    seoTitle: "Area Unit Converter | SmartCalc Hub",
    seoDescription: "Convert between square feet, square meters, acres, and hectares."
  },
  {
    id: "data-transfer",
    title: "Data Transfer Rate",
    description: "Convert Mbps, MB/s, and more",
    category: "conversion",
    icon: Wifi,
    path: "/calculator/data-transfer",
    seoTitle: "Data Transfer Rate Converter | SmartCalc Hub",
    seoDescription: "Convert between Mbps, MB/s, and other data transfer rates."
  },
  {
    id: "pressure",
    title: "Pressure Converter",
    description: "Convert bar, psi, kPa, and more",
    category: "conversion",
    icon: Gauge,
    path: "/calculator/pressure",
    seoTitle: "Pressure Converter | SmartCalc Hub",
    seoDescription: "Convert between bar, psi, kPa, and other pressure units."
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
