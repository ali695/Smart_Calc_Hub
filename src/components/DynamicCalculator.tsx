import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { evaluateFormula, formatValue } from "@/lib/safeFormula";
import { Calculator } from "lucide-react";

interface InputDef {
  key: string;
  label: string;
  type: "number" | "select";
  default?: number | string;
  unit?: string;
  options?: { value: string; label: string }[];
}
interface OutputDef {
  key: string;
  label: string;
  formula: string;
  format?: "number" | "currency" | "percent" | "integer";
}
export interface Definition { inputs: InputDef[]; outputs: OutputDef[]; }

interface Props { definition: Definition; name?: string; }

export const DynamicCalculator = ({ definition, name }: Props) => {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const out: Record<string, any> = {};
    definition.inputs.forEach((i) => { out[i.key] = i.default ?? (i.type === "number" ? 0 : ""); });
    return out;
  });
  const [computed, setComputed] = useState(false);

  const results = useMemo(() => {
    const scope: Record<string, any> = {};
    definition.inputs.forEach((i) => {
      const raw = values[i.key];
      scope[i.key] = i.type === "number" ? Number(raw) || 0 : raw;
    });
    return definition.outputs.map((o) => ({
      ...o,
      ...evaluateFormula(o.formula, scope),
    }));
  }, [values, definition]);

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        {definition.inputs.length === 0 && (
          <p className="text-sm text-muted-foreground">No inputs defined yet.</p>
        )}
        {definition.inputs.map((inp) => (
          <div key={inp.key} className="space-y-1">
            <Label>{inp.label}{inp.unit ? ` (${inp.unit})` : ""}</Label>
            {inp.type === "number" ? (
              <Input
                type="number"
                value={values[inp.key] ?? ""}
                onChange={(e) => setValues((s) => ({ ...s, [inp.key]: e.target.value }))}
              />
            ) : (
              <select
                className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                value={String(values[inp.key] ?? "")}
                onChange={(e) => setValues((s) => ({ ...s, [inp.key]: e.target.value }))}
              >
                {(inp.options ?? []).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <Button type="button" onClick={() => setComputed(true)} disabled={definition.inputs.length === 0}>
          <Calculator className="h-4 w-4" /> Calculate
        </Button>
      </Card>

      {computed && results.length > 0 && (
        <Card className="p-4 space-y-2">
          <h3 className="font-semibold">{name ? `${name} results` : "Results"}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {results.map((r) => (
              <div key={r.key} className="border rounded-md p-3">
                <div className="text-xs text-muted-foreground">{r.label}</div>
                <div className="text-lg font-semibold">
                  {r.ok ? formatValue(r.value, r.format) : <span className="text-destructive text-sm">{r.error}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
