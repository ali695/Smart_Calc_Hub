import { z } from "zod";

// Common validation schemas for calculator inputs
export const numberInputSchema = (options: {
  min?: number;
  max?: number;
  fieldName?: string;
} = {}) => {
  const { min = 0, max = 999999999, fieldName = "Value" } = options;
  
  return z.number({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} must be a number`,
  })
  .min(min, { message: `${fieldName} must be at least ${min}` })
  .max(max, { message: `${fieldName} must not exceed ${max}` })
  .finite({ message: `${fieldName} must be a valid number` });
};

// Specific schemas for common calculator inputs
export const schemas = {
  bmi: z.object({
    height: numberInputSchema({ min: 50, max: 300, fieldName: "Height" }),
    weight: numberInputSchema({ min: 20, max: 500, fieldName: "Weight" }),
  }),
  
  percentage: z.object({
    percent: numberInputSchema({ min: 0, max: 100000, fieldName: "Percentage" }),
    number: numberInputSchema({ min: -999999999, max: 999999999, fieldName: "Number" }),
  }),
  
  calorie: z.object({
    age: numberInputSchema({ min: 1, max: 120, fieldName: "Age" }),
    weight: numberInputSchema({ min: 20, max: 500, fieldName: "Weight" }),
    height: numberInputSchema({ min: 50, max: 300, fieldName: "Height" }),
  }),
  
  loan: z.object({
    principal: numberInputSchema({ min: 100, max: 100000000, fieldName: "Loan amount" }),
    interestRate: numberInputSchema({ min: 0, max: 100, fieldName: "Interest rate" }),
    years: numberInputSchema({ min: 0.1, max: 50, fieldName: "Loan term" }),
  }),
  
  mortgage: z.object({
    loanAmount: numberInputSchema({ min: 1000, max: 100000000, fieldName: "Loan amount" }),
    interestRate: numberInputSchema({ min: 0, max: 30, fieldName: "Interest rate" }),
    loanTerm: numberInputSchema({ min: 1, max: 50, fieldName: "Loan term" }),
    downPayment: numberInputSchema({ min: 0, max: 100000000, fieldName: "Down payment" }),
  }),
  
  retirement: z.object({
    currentAge: numberInputSchema({ min: 18, max: 100, fieldName: "Current age" }),
    retirementAge: numberInputSchema({ min: 50, max: 100, fieldName: "Retirement age" }),
    currentSavings: numberInputSchema({ min: 0, max: 100000000, fieldName: "Current savings" }),
    monthlyContribution: numberInputSchema({ min: 0, max: 1000000, fieldName: "Monthly contribution" }),
    returnRate: numberInputSchema({ min: 0, max: 50, fieldName: "Return rate" }),
  }),
  
  compoundInterest: z.object({
    principal: numberInputSchema({ min: 1, max: 100000000, fieldName: "Principal" }),
    rate: numberInputSchema({ min: 0, max: 100, fieldName: "Interest rate" }),
    time: numberInputSchema({ min: 0.1, max: 100, fieldName: "Time period" }),
    frequency: numberInputSchema({ min: 1, max: 365, fieldName: "Compound frequency" }),
  }),
  
  // Text input validation
  textInput: z.string().max(10000, "Input too long (max 10,000 characters)"),
  
  // Trigonometric functions
  arcsin: z.object({
    value: numberInputSchema({ min: -1, max: 1, fieldName: "Value" }),
  }),
  
  arccos: z.object({
    value: numberInputSchema({ min: -1, max: 1, fieldName: "Value" }),
  }),
  
  // Temperature bounds
  temperature: z.object({
    celsius: numberInputSchema({ min: -273.15, max: 1000000, fieldName: "Celsius" }),
  }),
};

// Validation helper - throws on error for simpler usage
export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

// Helper to safely parse float from string input
export const safeParseFloat = (value: string): number | null => {
  if (!value || value.trim() === "") return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) || !isFinite(parsed) ? null : parsed;
};

// Helper to safely parse int from string input
export const safeParseInt = (value: string): number | null => {
  if (!value || value.trim() === "") return null;
  const parsed = parseInt(value);
  return isNaN(parsed) || !isFinite(parsed) ? null : parsed;
};
