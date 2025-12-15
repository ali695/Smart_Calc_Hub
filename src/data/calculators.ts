import { Calculator, Heart, Percent, Ruler, DollarSign, Activity, TrendingUp, Scale, Receipt, Target, TrendingDown, Banknote, CreditCard, Car, Utensils, Weight, Droplet, Baby, HeartPulse, Apple, Beef, BarChart3, Divide, Calendar, ThermometerSun, PiggyBank, TrendingDown as Inflation, Globe, Home, BarChart, Calculator as CalcIcon, Wallet, Heart as BloodPressure, Moon, Footprints, ThermometerIcon, CalendarHeart, TrendingUp as PercentChange, Sigma, Shapes, Cylinder, Hash, ReceiptText, Timer, Fuel, Zap, Map, Wifi, Gauge, DollarSign as SimpleInterest, CreditCard as EMI, Tag, Flame, SquareRadical, TrendingUp as TrigIcon, Asterisk, MapPin, Navigation, Circle, Triangle, Coins, Minus, Binary, Activity as PressureIcon, RotateCcw, Repeat, Move, Globe2, Waves, UserCheck, Layers, Code2, Server, Shield, Lock, Database, Cpu, Cog, Wrench, Atom, TestTube, Wind } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface CalculatorData {
  id: string;
  title: string;
  description: string;
  category: "finance" | "health" | "math" | "conversion" | "tech" | "engineering" | "business" | "science" | "real-estate" | "crypto";
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
  },
  // New Finance Calculators
  {
    id: "simple-interest",
    title: "Simple Interest Calculator",
    description: "Calculate simple interest on loans and investments",
    category: "finance",
    icon: SimpleInterest,
    path: "/calculator/simple-interest",
    seoTitle: "Simple Interest Calculator – Calculate Interest Online | SmartCalc Hub",
    seoDescription: "Free simple interest calculator to compute interest on loans and investments. Enter principal, rate, and time for instant accurate results."
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Calculate Equated Monthly Installment for loans",
    category: "finance",
    icon: EMI,
    path: "/calculator/emi",
    seoTitle: "EMI Calculator – Calculate Monthly Loan Payments | SmartCalc Hub",
    seoDescription: "Free EMI calculator to compute equated monthly installments for home loans, car loans, and personal loans."
  },
  {
    id: "discount",
    title: "Discount Calculator",
    description: "Calculate final price and savings with discount percentage",
    category: "finance",
    icon: Tag,
    path: "/calculator/discount",
    seoTitle: "Discount Calculator – Calculate Sale Prices & Savings | SmartCalc Hub",
    seoDescription: "Free discount calculator to find final prices and savings instantly. Perfect for shopping, sales, and budgeting."
  },
  // New Health Calculators
  {
    id: "tdee",
    title: "TDEE Calculator",
    description: "Calculate Total Daily Energy Expenditure for weight management",
    category: "health",
    icon: Flame,
    path: "/calculator/tdee",
    seoTitle: "TDEE Calculator – Calculate Total Daily Energy Expenditure | SmartCalc Hub",
    seoDescription: "Free TDEE calculator to determine your daily calorie needs based on activity level for weight loss or gain."
  },
  // New Math Calculators
  {
    id: "square-root",
    title: "Square Root Calculator",
    description: "Calculate square roots of any positive number",
    category: "math",
    icon: SquareRadical,
    path: "/calculator/square-root",
    seoTitle: "Square Root Calculator – Calculate √x Instantly | SmartCalc Hub",
    seoDescription: "Free online square root calculator. Find square roots of any positive number with accurate decimal results."
  },
  {
    id: "sine",
    title: "Sine Calculator (sin θ)",
    description: "Calculate sine values for angles in degrees or radians",
    category: "math",
    icon: TrigIcon,
    path: "/calculator/sine",
    seoTitle: "Sine Calculator – Calculate sin(θ) Online | SmartCalc Hub",
    seoDescription: "Free online sine calculator for angles in degrees or radians. Get accurate sin(θ) values instantly."
  },
  {
    id: "cosine",
    title: "Cosine Calculator (cos θ)",
    description: "Calculate cosine values for angles in degrees or radians",
    category: "math",
    icon: TrigIcon,
    path: "/calculator/cosine",
    seoTitle: "Cosine Calculator – Calculate cos(θ) Online | SmartCalc Hub",
    seoDescription: "Free online cosine calculator for angles in degrees or radians. Get accurate cos(θ) values instantly."
  },
  {
    id: "factorial",
    title: "Factorial Calculator",
    description: "Calculate factorial (n!) of any non-negative integer",
    category: "math",
    icon: Asterisk,
    path: "/calculator/factorial",
    seoTitle: "Factorial Calculator – Calculate n! Online | SmartCalc Hub",
    seoDescription: "Free factorial calculator to compute n! for any non-negative integer. Get instant results with steps."
  },
  // New Conversion Calculators
  {
    id: "area-converter",
    title: "Area Converter",
    description: "Convert between different area units instantly",
    category: "conversion",
    icon: MapPin,
    path: "/calculator/area-converter",
    seoTitle: "Area Converter – Convert Square Meters, Feet, Acres | SmartCalc Hub",
    seoDescription: "Free area converter for square meters, square feet, acres, hectares and more. Instant accurate conversions."
  },
  {
    id: "speed-converter",
    title: "Speed Converter",
    description: "Convert between km/h, mph, m/s, and more",
    category: "conversion",
    icon: Navigation,
    path: "/calculator/speed-converter",
    seoTitle: "Speed Converter – Convert km/h, mph, m/s, Knots | SmartCalc Hub",
    seoDescription: "Free speed converter for kilometers per hour, miles per hour, meters per second, knots and Mach."
  },
  // Additional Math Calculators
  {
    id: "tangent",
    title: "Tangent Calculator (tan θ)",
    description: "Calculate tangent values for angles in degrees or radians",
    category: "math",
    icon: TrigIcon,
    path: "/calculator/tangent",
    seoTitle: "Tangent Calculator – Calculate tan(θ) Online | SmartCalc Hub",
    seoDescription: "Free online tangent calculator for angles in degrees or radians. Get accurate tan(θ) values instantly."
  },
  {
    id: "logarithm",
    title: "Logarithm Calculator",
    description: "Calculate logarithms with any base",
    category: "math",
    icon: CalcIcon,
    path: "/calculator/logarithm",
    seoTitle: "Logarithm Calculator – Calculate Log with Any Base | SmartCalc Hub",
    seoDescription: "Free logarithm calculator to compute log values with any base. Perfect for math and science."
  },
  {
    id: "exponent",
    title: "Exponent Calculator",
    description: "Calculate powers and exponents for any base",
    category: "math",
    icon: Asterisk,
    path: "/calculator/exponent",
    seoTitle: "Exponent Calculator – Calculate Powers Online | SmartCalc Hub",
    seoDescription: "Free exponent calculator to compute base raised to any power. Supports all exponent types."
  },
  {
    id: "triangle-area",
    title: "Triangle Area Calculator",
    description: "Calculate triangle area using base and height",
    category: "math",
    icon: Triangle,
    path: "/calculator/triangle-area",
    seoTitle: "Triangle Area Calculator – Calculate Triangle Area Online | SmartCalc Hub",
    seoDescription: "Free triangle area calculator using base and height. Get instant results for any triangle."
  },
  {
    id: "circle",
    title: "Circle Calculator",
    description: "Calculate circle area, circumference, and diameter",
    category: "math",
    icon: Circle,
    path: "/calculator/circle",
    seoTitle: "Circle Calculator – Area, Circumference, Diameter | SmartCalc Hub",
    seoDescription: "Free circle calculator to find area, circumference, and diameter from radius."
  },
  {
    id: "pythagoras",
    title: "Pythagorean Theorem Calculator",
    description: "Calculate hypotenuse and right triangle properties",
    category: "math",
    icon: Triangle,
    path: "/calculator/pythagoras",
    seoTitle: "Pythagorean Theorem Calculator – Right Triangle | SmartCalc Hub",
    seoDescription: "Free Pythagorean theorem calculator to find hypotenuse and triangle properties."
  },
  {
    id: "permutation-combination",
    title: "Permutation & Combination",
    description: "Calculate nPr and nCr for probability",
    category: "math",
    icon: Binary,
    path: "/calculator/permutation-combination",
    seoTitle: "Permutation & Combination Calculator – nPr and nCr | SmartCalc Hub",
    seoDescription: "Free permutation and combination calculator. Calculate nPr and nCr instantly."
  },
  // Additional Finance Calculators
  {
    id: "net-worth",
    title: "Net Worth Calculator",
    description: "Calculate your total net worth from assets and liabilities",
    category: "finance",
    icon: Coins,
    path: "/calculator/net-worth",
    seoTitle: "Net Worth Calculator – Calculate Your Financial Worth | SmartCalc Hub",
    seoDescription: "Free net worth calculator to track assets and liabilities. Calculate total financial worth."
  },
  // Additional Health Calculators
  {
    id: "calorie-deficit",
    title: "Calorie Deficit Calculator",
    description: "Calculate daily calories for weight loss goals",
    category: "health",
    icon: Minus,
    path: "/calculator/calorie-deficit",
    seoTitle: "Calorie Deficit Calculator – Weight Loss Calories | SmartCalc Hub",
    seoDescription: "Free calorie deficit calculator for weight loss. Safe and sustainable deficit planning."
  },
  // Additional Conversion Calculators
  {
    id: "pressure-converter",
    title: "Pressure Converter",
    description: "Convert between bar, PSI, kPa, atm, and more",
    category: "conversion",
    icon: PressureIcon,
    path: "/calculator/pressure-converter",
    seoTitle: "Pressure Converter – Convert Bar, PSI, kPa, Atm | SmartCalc Hub",
    seoDescription: "Free pressure converter for bar, PSI, kilopascal, atmosphere and more."
  },
  // Inverse Trigonometry
  {
    id: "arcsin",
    title: "Arcsine Calculator (sin⁻¹)",
    description: "Calculate inverse sine to find angles from ratios",
    category: "math",
    icon: RotateCcw,
    path: "/calculator/arcsin",
    seoTitle: "Arcsine Calculator – Calculate sin⁻¹(x) Online | SmartCalc Hub",
    seoDescription: "Free inverse sine (arcsin) calculator. Convert sine ratios to angles instantly."
  },
  {
    id: "arccos",
    title: "Arccosine Calculator (cos⁻¹)",
    description: "Calculate inverse cosine to find angles from ratios",
    category: "math",
    icon: Repeat,
    path: "/calculator/arccos",
    seoTitle: "Arccosine Calculator – Calculate cos⁻¹(x) Online | SmartCalc Hub",
    seoDescription: "Free inverse cosine (arccos) calculator. Convert cosine ratios to angles instantly."
  },
  {
    id: "arctan",
    title: "Arctangent Calculator (tan⁻¹)",
    description: "Calculate inverse tangent to find angles from ratios",
    category: "math",
    icon: Move,
    path: "/calculator/arctan",
    seoTitle: "Arctangent Calculator – Calculate tan⁻¹(x) Online | SmartCalc Hub",
    seoDescription: "Free inverse tangent (arctan) calculator. Convert tangent ratios to angles instantly."
  },
  {
    id: "radian-degree",
    title: "Radian Degree Converter",
    description: "Convert angles between radians and degrees",
    category: "math",
    icon: Globe2,
    path: "/calculator/radian-degree",
    seoTitle: "Radian to Degree Converter – Convert Angles Online | SmartCalc Hub",
    seoDescription: "Free radian to degree converter. Instantly convert between radians and degrees."
  },
  {
    id: "scientific-notation",
    title: "Scientific Notation Calculator",
    description: "Convert to and from scientific notation",
    category: "math",
    icon: Waves,
    path: "/calculator/scientific-notation",
    seoTitle: "Scientific Notation Calculator – Convert to Exponential Form | SmartCalc Hub",
    seoDescription: "Free scientific notation calculator. Convert numbers to and from exponential notation."
  },
  // Additional Finance Calculators
  {
    id: "budget-planner",
    title: "Budget Planner",
    description: "Plan monthly budget and track income vs expenses",
    category: "finance",
    icon: ReceiptText,
    path: "/calculator/budget-planner",
    seoTitle: "Budget Planner Calculator – Monthly Budget Planning | SmartCalc Hub",
    seoDescription: "Free budget planner calculator. Track income, expenses, and savings rate."
  },
  {
    id: "salary-after-tax",
    title: "Salary After Tax",
    description: "Calculate take-home pay after tax deductions",
    category: "finance",
    icon: UserCheck,
    path: "/calculator/salary-after-tax",
    seoTitle: "Salary After Tax Calculator – Calculate Take-Home Pay | SmartCalc Hub",
    seoDescription: "Free salary after tax calculator. Calculate net income and take-home pay."
  },
  // Additional Health Calculators
  {
    id: "waist-to-height",
    title: "Waist-to-Height Ratio",
    description: "Assess health risk from body fat distribution",
    category: "health",
    icon: Scale,
    path: "/calculator/waist-to-height",
    seoTitle: "Waist-to-Height Ratio Calculator – WHtR Health Assessment | SmartCalc Hub",
    seoDescription: "Free waist-to-height ratio calculator. Assess health risk from central obesity."
  },
  {
    id: "body-surface-area",
    title: "Body Surface Area",
    description: "Calculate BSA for medical dosing using Du Bois formula",
    category: "health",
    icon: Layers,
    path: "/calculator/body-surface-area",
    seoTitle: "Body Surface Area Calculator – BSA for Medical Dosing | SmartCalc Hub",
    seoDescription: "Free BSA calculator using Du Bois, Mosteller, and Haycock formulas."
  },
  // Additional Conversion Calculators
  {
    id: "energy-converter",
    title: "Energy Converter",
    description: "Convert between joules, calories, kWh, BTU and more",
    category: "conversion",
    icon: Zap,
    path: "/calculator/energy-converter",
    seoTitle: "Energy Converter – Joules, Calories, kWh Conversion | SmartCalc Hub",
    seoDescription: "Free energy unit converter. Convert between joules, calories, watt-hours, BTU."
  },
  // Tech Tools Category
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes for text and files",
    category: "tech",
    icon: Shield,
    path: "/calculator/hash-generator",
    seoTitle: "Hash Generator – MD5, SHA-1, SHA-256 Hashing Tool | SmartCalc Hub",
    seoDescription: "Free hash generator for MD5, SHA-1, SHA-256. Secure hash calculation for text and files."
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text to/from Base64 format",
    category: "tech",
    icon: Code2,
    path: "/calculator/base64-encoder",
    seoTitle: "Base64 Encoder/Decoder – Convert Text to Base64 | SmartCalc Hub",
    seoDescription: "Free Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings instantly."
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    category: "tech",
    icon: Database,
    path: "/calculator/json-formatter",
    seoTitle: "JSON Formatter – Validate & Beautify JSON | SmartCalc Hub",
    seoDescription: "Free JSON formatter and validator. Format, validate, and beautify JSON data instantly."
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate strong, secure random passwords",
    category: "tech",
    icon: Lock,
    path: "/calculator/password-generator",
    seoTitle: "Password Generator – Create Strong Secure Passwords | SmartCalc Hub",
    seoDescription: "Free password generator. Create strong, random, secure passwords with custom length and characters."
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and CMYK",
    category: "tech",
    icon: Cpu,
    path: "/calculator/color-converter",
    seoTitle: "Color Converter – HEX, RGB, HSL, CMYK Conversion | SmartCalc Hub",
    seoDescription: "Free color converter. Convert between HEX, RGB, HSL, and CMYK color formats instantly."
  },
  // Engineering Category
  {
    id: "ohms-law",
    title: "Ohm's Law Calculator",
    description: "Calculate voltage, current, resistance, and power",
    category: "engineering",
    icon: Zap,
    path: "/calculator/ohms-law",
    seoTitle: "Ohm's Law Calculator – Voltage, Current, Resistance | SmartCalc Hub",
    seoDescription: "Free Ohm's law calculator. Calculate voltage, current, resistance, and power using V=IR."
  },
  {
    id: "force-calculator",
    title: "Force Calculator",
    description: "Calculate force, mass, and acceleration using F=ma",
    category: "engineering",
    icon: Wrench,
    path: "/calculator/force",
    seoTitle: "Force Calculator – Calculate Force, Mass, Acceleration | SmartCalc Hub",
    seoDescription: "Free force calculator using Newton's second law F=ma. Calculate force, mass, or acceleration."
  },
  {
    id: "torque-calculator",
    title: "Torque Calculator",
    description: "Calculate torque from force and distance",
    category: "engineering",
    icon: Cog,
    path: "/calculator/torque",
    seoTitle: "Torque Calculator – Calculate Rotational Force | SmartCalc Hub",
    seoDescription: "Free torque calculator. Calculate torque from force and lever arm distance."
  },
  {
    id: "power-calculator",
    title: "Power Calculator",
    description: "Calculate electrical and mechanical power",
    category: "engineering",
    icon: Cpu,
    path: "/calculator/power",
    seoTitle: "Power Calculator – Electrical & Mechanical Power | SmartCalc Hub",
    seoDescription: "Free power calculator for electrical (P=VI) and mechanical (P=Fv) power calculations."
  },
  {
    id: "stress-strain",
    title: "Stress-Strain Calculator",
    description: "Calculate stress, strain, and Young's modulus",
    category: "engineering",
    icon: Activity,
    path: "/calculator/stress-strain",
    seoTitle: "Stress-Strain Calculator – Material Mechanics | SmartCalc Hub",
    seoDescription: "Free stress-strain calculator. Calculate stress, strain, and Young's modulus for materials."
  },
  // Business Category
  {
    id: "growth-rate",
    title: "Growth Rate Calculator",
    description: "Calculate CAGR and year-over-year growth",
    category: "business",
    icon: TrendingUp,
    path: "/calculator/growth-rate",
    seoTitle: "Growth Rate Calculator – CAGR & YoY Growth | SmartCalc Hub",
    seoDescription: "Free growth rate calculator. Calculate compound annual growth rate (CAGR) and year-over-year growth."
  },
  {
    id: "customer-lifetime-value",
    title: "Customer Lifetime Value",
    description: "Calculate CLV for business analytics",
    category: "business",
    icon: UserCheck,
    path: "/calculator/customer-lifetime-value",
    seoTitle: "Customer Lifetime Value Calculator – CLV Analysis | SmartCalc Hub",
    seoDescription: "Free CLV calculator. Calculate customer lifetime value for better business decisions."
  },
  {
    id: "inventory-turnover",
    title: "Inventory Turnover",
    description: "Calculate inventory turnover ratio and days",
    category: "business",
    icon: Layers,
    path: "/calculator/inventory-turnover",
    seoTitle: "Inventory Turnover Calculator – Stock Efficiency | SmartCalc Hub",
    seoDescription: "Free inventory turnover calculator. Calculate turnover ratio and days inventory outstanding."
  },
  {
    id: "conversion-rate",
    title: "Conversion Rate Calculator",
    description: "Calculate conversion rates and optimization metrics",
    category: "business",
    icon: Target,
    path: "/calculator/conversion-rate",
    seoTitle: "Conversion Rate Calculator – Optimize Marketing ROI | SmartCalc Hub",
    seoDescription: "Free conversion rate calculator. Calculate and optimize your marketing conversion metrics."
  },
  {
    id: "payback-period",
    title: "Payback Period",
    description: "Calculate investment payback time",
    category: "business",
    icon: Timer,
    path: "/calculator/payback-period",
    seoTitle: "Payback Period Calculator – Investment Recovery Time | SmartCalc Hub",
    seoDescription: "Free payback period calculator. Determine how long it takes to recover your investment."
  },
  // Science Category
  {
    id: "ph-calculator",
    title: "pH Calculator",
    description: "Calculate pH, pOH, and hydrogen ion concentration",
    category: "science",
    icon: TestTube,
    path: "/calculator/ph",
    seoTitle: "pH Calculator – Calculate pH, pOH, H+ Concentration | SmartCalc Hub",
    seoDescription: "Free pH calculator. Calculate pH, pOH, and hydrogen ion concentration for chemistry."
  },
  {
    id: "molarity-calculator",
    title: "Molarity Calculator",
    description: "Calculate solution molarity and dilutions",
    category: "science",
    icon: TestTube,
    path: "/calculator/molarity-calculator",
    seoTitle: "Molarity Calculator – Solution Concentration | SmartCalc Hub",
    seoDescription: "Free molarity calculator. Calculate molar concentration and solution dilutions."
  },
  {
    id: "half-life",
    title: "Half-Life Calculator",
    description: "Calculate radioactive decay and half-life",
    category: "science",
    icon: Atom,
    path: "/calculator/half-life",
    seoTitle: "Half-Life Calculator – Radioactive Decay | SmartCalc Hub",
    seoDescription: "Free half-life calculator. Calculate radioactive decay time and remaining substance."
  },
  {
    id: "density-calculator",
    title: "Density Calculator",
    description: "Calculate density from mass and volume",
    category: "science",
    icon: Waves,
    path: "/calculator/density-calculator",
    seoTitle: "Density Calculator – Mass, Volume, Density | SmartCalc Hub",
    seoDescription: "Free density calculator. Calculate density using mass and volume (ρ = m/V)."
  },
  {
    id: "kinetic-energy",
    title: "Kinetic Energy Calculator",
    description: "Calculate kinetic energy from mass and velocity",
    category: "science",
    icon: Wind,
    path: "/calculator/kinetic-energy",
    seoTitle: "Kinetic Energy Calculator – KE = ½mv² | SmartCalc Hub",
    seoDescription: "Free kinetic energy calculator. Calculate KE using mass and velocity (KE = ½mv²)."
  },
  // Country-specific Tax Calculators
  {
    id: "us-income-tax",
    title: "US Income Tax Calculator",
    description: "Calculate federal income tax for United States",
    category: "finance",
    icon: Receipt,
    path: "/calculator/us-income-tax",
    seoTitle: "US Income Tax Calculator – Federal Tax Estimator | SmartCalc Hub",
    seoDescription: "Free US income tax calculator. Calculate federal taxes using 2024 tax brackets."
  },
  {
    id: "uk-income-tax",
    title: "UK Income Tax Calculator",
    description: "Calculate income tax and National Insurance for UK",
    category: "finance",
    icon: Receipt,
    path: "/calculator/uk-income-tax",
    seoTitle: "UK Income Tax Calculator – PAYE Tax Estimator | SmartCalc Hub",
    seoDescription: "Free UK income tax calculator. Calculate PAYE tax and National Insurance contributions."
  },
  {
    id: "canada-income-tax",
    title: "Canada Income Tax Calculator",
    description: "Calculate federal and provincial income tax for Canada",
    category: "finance",
    icon: Receipt,
    path: "/calculator/canada-income-tax",
    seoTitle: "Canada Income Tax Calculator – Federal & Provincial Tax | SmartCalc Hub",
    seoDescription: "Free Canada income tax calculator. Calculate federal and provincial taxes."
  },
  {
    id: "australia-income-tax",
    title: "Australia Income Tax Calculator",
    description: "Calculate income tax for Australian residents",
    category: "finance",
    icon: Receipt,
    path: "/calculator/australia-income-tax",
    seoTitle: "Australia Income Tax Calculator – ATO Tax Estimator | SmartCalc Hub",
    seoDescription: "Free Australia income tax calculator using ATO tax brackets."
  },
  {
    id: "india-income-tax",
    title: "India Income Tax Calculator",
    description: "Calculate income tax under new and old regime for India",
    category: "finance",
    icon: Receipt,
    path: "/calculator/india-income-tax",
    seoTitle: "India Income Tax Calculator – ITR Tax Estimator | SmartCalc Hub",
    seoDescription: "Free India income tax calculator. Compare new vs old tax regime."
  },
  {
    id: "paycheck",
    title: "Paycheck Calculator (US)",
    description: "Calculate take-home pay after US taxes and deductions",
    category: "finance",
    icon: Wallet,
    path: "/calculator/paycheck",
    seoTitle: "US Paycheck Calculator – Take Home Pay Estimator | SmartCalc Hub",
    seoDescription: "Free US paycheck calculator. Calculate net pay after federal, state taxes and deductions."
  },
  {
    id: "mortgage-recast",
    title: "Mortgage Recast Calculator",
    description: "Calculate new payments after mortgage recasting",
    category: "finance",
    icon: Home,
    path: "/calculator/mortgage-recast",
    seoTitle: "Mortgage Recast Calculator – Recalculate Payments | SmartCalc Hub",
    seoDescription: "Free mortgage recast calculator. See how lump sum payment affects monthly payments."
  },
  {
    id: "refinance",
    title: "Refinance Calculator",
    description: "Calculate savings from refinancing your mortgage",
    category: "finance",
    icon: Home,
    path: "/calculator/refinance",
    seoTitle: "Refinance Calculator – Mortgage Refinance Savings | SmartCalc Hub",
    seoDescription: "Free refinance calculator. Compare current vs new mortgage payments and savings."
  },
  // Math Calculators
  {
    id: "percentage-increase",
    title: "Percentage Increase Calculator",
    description: "Calculate percentage increase between two values",
    category: "math",
    icon: TrendingUp,
    path: "/calculator/percentage-increase",
    seoTitle: "Percentage Increase Calculator – Calculate % Growth | SmartCalc Hub",
    seoDescription: "Free percentage increase calculator. Calculate percent growth between two numbers."
  },
  {
    id: "percentage-decrease",
    title: "Percentage Decrease Calculator",
    description: "Calculate percentage decrease between two values",
    category: "math",
    icon: TrendingDown,
    path: "/calculator/percentage-decrease",
    seoTitle: "Percentage Decrease Calculator – Calculate % Reduction | SmartCalc Hub",
    seoDescription: "Free percentage decrease calculator. Calculate percent reduction between two numbers."
  },
  {
    id: "fraction-decimal",
    title: "Fraction ↔ Decimal Converter",
    description: "Convert between fractions and decimals",
    category: "math",
    icon: Divide,
    path: "/calculator/fraction-decimal",
    seoTitle: "Fraction to Decimal Converter – Convert Instantly | SmartCalc Hub",
    seoDescription: "Free fraction to decimal converter. Convert fractions to decimals and decimals to fractions."
  },
  {
    id: "standard-deviation",
    title: "Standard Deviation Calculator",
    description: "Calculate standard deviation and variance",
    category: "math",
    icon: Sigma,
    path: "/calculator/standard-deviation",
    seoTitle: "Standard Deviation Calculator – Statistical Analysis | SmartCalc Hub",
    seoDescription: "Free standard deviation calculator. Calculate mean, variance, and standard deviation."
  },
  {
    id: "probability",
    title: "Probability Calculator",
    description: "Calculate probability of single and multiple events",
    category: "math",
    icon: Binary,
    path: "/calculator/probability",
    seoTitle: "Probability Calculator – Calculate Event Odds | SmartCalc Hub",
    seoDescription: "Free probability calculator. Calculate odds of single and combined events."
  },
  // Health Calculator
  {
    id: "one-rep-max",
    title: "One Rep Max (1RM) Calculator",
    description: "Calculate your one rep max for weightlifting",
    category: "health",
    icon: Activity,
    path: "/calculator/one-rep-max",
    seoTitle: "One Rep Max Calculator – 1RM Strength Estimator | SmartCalc Hub",
    seoDescription: "Free 1RM calculator. Estimate your one rep max using weight lifted and reps."
  },
  // Tech/Conversion Calculators
  {
    id: "binary-decimal",
    title: "Binary ↔ Decimal Converter",
    description: "Convert between binary and decimal numbers",
    category: "tech",
    icon: Binary,
    path: "/calculator/binary-decimal",
    seoTitle: "Binary to Decimal Converter – Number Conversion | SmartCalc Hub",
    seoDescription: "Free binary decimal converter. Convert binary to decimal and decimal to binary."
  },
  {
    id: "hex-decimal",
    title: "Hex ↔ Decimal Converter",
    description: "Convert between hexadecimal and decimal numbers",
    category: "tech",
    icon: Hash,
    path: "/calculator/hex-decimal",
    seoTitle: "Hex to Decimal Converter – Hexadecimal Conversion | SmartCalc Hub",
    seoDescription: "Free hex decimal converter. Convert hexadecimal to decimal and decimal to hex."
  },
  {
    id: "roman-numeral",
    title: "Roman Numeral Converter",
    description: "Convert between Roman numerals and decimal numbers",
    category: "conversion",
    icon: Hash,
    path: "/calculator/roman-numeral",
    seoTitle: "Roman Numeral Converter – Convert Numbers | SmartCalc Hub",
    seoDescription: "Free Roman numeral converter. Convert Roman numerals to decimal and back."
  },
  {
    id: "days",
    title: "Days Calculator",
    description: "Calculate days between two dates",
    category: "conversion",
    icon: Calendar,
    path: "/calculator/days",
    seoTitle: "Days Calculator – Count Days Between Dates | SmartCalc Hub",
    seoDescription: "Free days calculator. Calculate the number of days between two dates."
  },
  {
    id: "countdown",
    title: "Countdown Calculator",
    description: "Countdown timer to any date and time",
    category: "conversion",
    icon: Timer,
    path: "/calculator/countdown",
    seoTitle: "Countdown Calculator – Time Until Date | SmartCalc Hub",
    seoDescription: "Free countdown calculator. Count down days, hours, minutes to any event."
  },
  // Real Estate Calculators
  {
    id: "rent-affordability",
    title: "Rent Affordability Calculator",
    description: "Calculate how much rent you can afford",
    category: "real-estate",
    icon: Home,
    path: "/calculator/rent-affordability",
    seoTitle: "Rent Affordability Calculator – How Much Rent Can I Afford | SmartCalc Hub",
    seoDescription: "Free rent affordability calculator. Calculate affordable rent based on income."
  },
  {
    id: "buy-vs-rent",
    title: "Buy vs Rent Calculator",
    description: "Compare costs of buying vs renting a home",
    category: "real-estate",
    icon: Home,
    path: "/calculator/buy-vs-rent",
    seoTitle: "Buy vs Rent Calculator – Should I Buy or Rent | SmartCalc Hub",
    seoDescription: "Free buy vs rent calculator. Compare total costs of buying vs renting."
  },
  {
    id: "cap-rate",
    title: "Cap Rate Calculator",
    description: "Calculate capitalization rate for real estate",
    category: "real-estate",
    icon: Home,
    path: "/calculator/cap-rate",
    seoTitle: "Cap Rate Calculator – Real Estate ROI | SmartCalc Hub",
    seoDescription: "Free cap rate calculator. Calculate capitalization rate for investment property."
  },
  {
    id: "property-tax",
    title: "Property Tax Calculator",
    description: "Calculate annual property taxes",
    category: "real-estate",
    icon: Home,
    path: "/calculator/property-tax",
    seoTitle: "Property Tax Calculator – Estimate Property Taxes | SmartCalc Hub",
    seoDescription: "Free property tax calculator. Estimate annual property tax payments."
  },
  {
    id: "house-flip",
    title: "House Flip Profit Calculator",
    description: "Calculate profit from flipping a house",
    category: "real-estate",
    icon: Home,
    path: "/calculator/house-flip",
    seoTitle: "House Flip Calculator – Flipping Profit Estimator | SmartCalc Hub",
    seoDescription: "Free house flip calculator. Calculate potential profit from real estate flipping."
  },
  // Crypto/Investing Calculators
  {
    id: "crypto-profit",
    title: "Crypto Profit Calculator",
    description: "Calculate profit/loss on cryptocurrency trades",
    category: "crypto",
    icon: Coins,
    path: "/calculator/crypto-profit",
    seoTitle: "Crypto Profit Calculator – Calculate Crypto Gains | SmartCalc Hub",
    seoDescription: "Free crypto profit calculator. Calculate gains/losses on cryptocurrency investments."
  },
  {
    id: "dca",
    title: "DCA Calculator",
    description: "Calculate returns using Dollar Cost Averaging",
    category: "crypto",
    icon: TrendingUp,
    path: "/calculator/dca",
    seoTitle: "DCA Calculator – Dollar Cost Averaging Returns | SmartCalc Hub",
    seoDescription: "Free DCA calculator. Calculate investment returns using dollar cost averaging strategy."
  },
  {
    id: "bitcoin-converter",
    title: "Bitcoin ↔ USD Converter",
    description: "Convert between Bitcoin and US Dollars",
    category: "crypto",
    icon: Coins,
    path: "/calculator/bitcoin-converter",
    seoTitle: "Bitcoin to USD Converter – BTC Price Calculator | SmartCalc Hub",
    seoDescription: "Free Bitcoin USD converter. Convert BTC to USD and USD to BTC instantly."
  },
  {
    id: "mining-profit",
    title: "Mining Profit Calculator",
    description: "Calculate cryptocurrency mining profitability",
    category: "crypto",
    icon: Cpu,
    path: "/calculator/mining-profit",
    seoTitle: "Mining Profit Calculator – Crypto Mining Profitability | SmartCalc Hub",
    seoDescription: "Free mining profit calculator. Calculate crypto mining revenue and costs."
  },
  // UK Finance Calculators
  {
    id: "national-insurance",
    title: "National Insurance Calculator",
    description: "Calculate UK National Insurance contributions (Class 1, 2, 4)",
    category: "finance",
    icon: Receipt,
    path: "/calculator/national-insurance",
    seoTitle: "UK National Insurance Calculator 2025/26 | SmartCalc Hub",
    seoDescription: "Free UK National Insurance calculator. Calculate NI contributions for Class 1, 2, and 4. PAYE ready."
  },
  {
    id: "stamp-duty",
    title: "Stamp Duty Calculator",
    description: "Calculate UK Stamp Duty Land Tax (SDLT) for property purchases",
    category: "finance",
    icon: Home,
    path: "/calculator/stamp-duty",
    seoTitle: "UK Stamp Duty Calculator (SDLT) 2025 | SmartCalc Hub",
    seoDescription: "Free UK Stamp Duty calculator. Calculate SDLT for England & Northern Ireland property purchases."
  },
  // US Finance Calculators
  {
    id: "social-security",
    title: "Social Security Estimator",
    description: "Estimate your US Social Security benefits at retirement",
    category: "finance",
    icon: PiggyBank,
    path: "/calculator/social-security",
    seoTitle: "Social Security Benefits Estimator 2025 | SmartCalc Hub",
    seoDescription: "Free Social Security calculator. Estimate your retirement benefits based on earnings history."
  },
  {
    id: "roth-ira",
    title: "Roth IRA Calculator",
    description: "Calculate Roth IRA growth and compare with Traditional IRA",
    category: "finance",
    icon: TrendingUp,
    path: "/calculator/roth-ira",
    seoTitle: "Roth IRA Calculator – Compare IRA Options | SmartCalc Hub",
    seoDescription: "Free Roth IRA calculator. Project growth and compare Roth vs Traditional IRA tax benefits."
  },
  {
    id: "sales-tax",
    title: "Sales Tax Calculator",
    description: "Calculate US sales tax by state and county",
    category: "finance",
    icon: Receipt,
    path: "/calculator/sales-tax",
    seoTitle: "US Sales Tax Calculator by State | SmartCalc Hub",
    seoDescription: "Free sales tax calculator. Calculate sales tax for all US states with local rates."
  },
  {
    id: "401k",
    title: "401(k) Calculator",
    description: "Calculate 401(k) retirement savings growth with employer match",
    category: "finance",
    icon: PiggyBank,
    path: "/calculator/401k",
    seoTitle: "401(k) Retirement Calculator 2025 | SmartCalc Hub",
    seoDescription: "Free 401(k) calculator. Project retirement savings with employer match and compound growth."
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
  { id: "conversion", name: "Conversion", icon: Ruler, color: "text-purple-600 dark:text-purple-400" },
  { id: "tech", name: "Tech Tools", icon: Code2, color: "text-cyan-600 dark:text-cyan-400" },
  { id: "engineering", name: "Engineering", icon: Cog, color: "text-orange-600 dark:text-orange-400" },
  { id: "business", name: "Business", icon: BarChart, color: "text-indigo-600 dark:text-indigo-400" },
  { id: "science", name: "Science", icon: TestTube, color: "text-pink-600 dark:text-pink-400" },
  { id: "real-estate", name: "Real Estate", icon: Home, color: "text-amber-600 dark:text-amber-400" },
  { id: "crypto", name: "Crypto", icon: Coins, color: "text-yellow-600 dark:text-yellow-400" }
];
