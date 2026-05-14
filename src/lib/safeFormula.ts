import { create, all, MathJsInstance } from "mathjs";

// Restricted mathjs instance — disable dangerous functions
const math: MathJsInstance = create(all);
math.import(
  {
    import: function () { throw new Error("Disabled"); },
    createUnit: function () { throw new Error("Disabled"); },
    evaluate: function () { throw new Error("Disabled"); },
    parse: function () { throw new Error("Disabled"); },
    simplify: function () { throw new Error("Disabled"); },
    derivative: function () { throw new Error("Disabled"); },
  },
  { override: true }
);

export interface FormulaResult {
  ok: boolean;
  value?: number | string;
  error?: string;
}

export const evaluateFormula = (
  expression: string,
  scope: Record<string, number | string>
): FormulaResult => {
  try {
    if (!expression?.trim()) return { ok: false, error: "Empty formula" };
    // Simple safety: reject suspicious tokens
    if (/[;`]|\bimport\b|\beval\b/.test(expression)) {
      return { ok: false, error: "Unsafe expression" };
    }
    const result = math.evaluate(expression, scope);
    if (typeof result === "number" && !Number.isFinite(result)) {
      return { ok: false, error: "Result is not finite" };
    }
    return { ok: true, value: result };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "Formula error" };
  }
};

export const formatValue = (
  value: number | string | undefined,
  format?: "number" | "currency" | "percent" | "integer"
): string => {
  if (value === undefined || value === null) return "—";
  if (typeof value !== "number") return String(value);
  switch (format) {
    case "currency":
      return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
    case "percent":
      return `${(value).toFixed(2)}%`;
    case "integer":
      return Math.round(value).toLocaleString();
    case "number":
    default:
      return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }
};
