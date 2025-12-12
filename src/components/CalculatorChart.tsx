import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Download, Image as ImageIcon } from "lucide-react";

export type ChartType = "line" | "area" | "bar" | "pie" | "comparison";

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  label?: string;
  [key: string]: string | number | undefined;
}

interface CalculatorChartProps {
  title: string;
  data: ChartDataPoint[];
  chartType?: ChartType;
  category?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  valueFormatter?: (value: number) => string;
  showExport?: boolean;
}

// Category-specific colors
const getCategoryColors = (category: string) => {
  const colors: Record<string, { primary: string; secondary: string; tertiary: string }> = {
    finance: { primary: "#10b981", secondary: "#34d399", tertiary: "#6ee7b7" },
    business: { primary: "#3b82f6", secondary: "#60a5fa", tertiary: "#93c5fd" },
    "real-estate": { primary: "#f97316", secondary: "#fb923c", tertiary: "#fdba74" },
    health: { primary: "#ec4899", secondary: "#f472b6", tertiary: "#f9a8d4" },
    math: { primary: "#06b6d4", secondary: "#22d3ee", tertiary: "#67e8f9" },
    science: { primary: "#8b5cf6", secondary: "#a78bfa", tertiary: "#c4b5fd" },
    engineering: { primary: "#64748b", secondary: "#94a3b8", tertiary: "#cbd5e1" },
    crypto: { primary: "#eab308", secondary: "#facc15", tertiary: "#fde047" },
    conversion: { primary: "#a855f7", secondary: "#c084fc", tertiary: "#d8b4fe" },
  };
  return colors[category] || { primary: "#6366f1", secondary: "#818cf8", tertiary: "#a5b4fc" };
};

const PIE_COLORS = ["#10b981", "#3b82f6", "#f97316", "#ec4899", "#8b5cf6", "#eab308"];

export const CalculatorChart = ({
  title,
  data,
  chartType = "area",
  category = "utility",
  xAxisLabel,
  yAxisLabel,
  valueFormatter = (v) => v.toLocaleString(),
  showExport = true
}: CalculatorChartProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const colors = getCategoryColors(category);

  const chartId = useMemo(() => `chart-${Math.random().toString(36).substr(2, 9)}`, []);

  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      const svgElement = document.querySelector(`#${chartId} svg`);
      if (!svgElement) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const img = new window.Image();
      img.onload = () => {
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        ctx.scale(2, 2);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const link = document.createElement("a");
        link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-chart.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
      };
      img.src = url;
    } catch (error) {
      console.error("Export failed:", error);
      setIsExporting(false);
    }
  };

  if (!data || data.length === 0) return null;

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 10, bottom: 10 }
    };

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: -5 } : undefined}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={valueFormatter}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), "Value"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.primary} 
              strokeWidth={2}
              dot={{ fill: colors.primary, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: colors.secondary }}
              name={data[0]?.label || "Value"}
            />
            {data.some(d => d.value2 !== undefined) && (
              <Line 
                type="monotone" 
                dataKey="value2" 
                stroke={colors.secondary} 
                strokeWidth={2}
                dot={{ fill: colors.secondary, strokeWidth: 2 }}
                name="Comparison"
              />
            )}
          </LineChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.4} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: -5 } : undefined}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={valueFormatter}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
            />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), "Value"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors.primary} 
              strokeWidth={2}
              fill={`url(#gradient-${chartId})`}
              name={data[0]?.label || "Value"}
            />
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={valueFormatter} />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), "Value"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Bar 
              dataKey="value" 
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
              name={data[0]?.label || "Value"}
            />
            {data.some(d => d.value2 !== undefined) && (
              <Bar 
                dataKey="value2" 
                fill={colors.secondary}
                radius={[4, 4, 0, 0]}
                name="Comparison"
              />
            )}
          </BarChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill={colors.primary}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), "Value"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
          </PieChart>
        );

      case "comparison":
        return (
          <BarChart {...commonProps} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={valueFormatter} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
            <Tooltip 
              formatter={(value: number) => [valueFormatter(value), "Value"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Bar 
              dataKey="value" 
              fill={colors.primary}
              radius={[0, 4, 4, 0]}
              name="Value"
            />
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-4 mt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm">{title}</h4>
        {showExport && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportPNG}
            disabled={isExporting}
            className="h-8 px-2"
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Export
          </Button>
        )}
      </div>
      <div id={chartId} className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Helper function to generate growth chart data
export const generateGrowthData = (
  principal: number,
  monthlyContribution: number,
  rate: number,
  years: number
): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let balance = principal;
  const monthlyRate = rate / 100 / 12;

  for (let year = 0; year <= years; year++) {
    data.push({
      name: `Year ${year}`,
      value: Math.round(balance)
    });
    
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
  }

  return data;
};

// Helper function to generate comparison data
export const generateComparisonData = (
  items: { name: string; value: number }[]
): ChartDataPoint[] => {
  return items.map(item => ({
    name: item.name,
    value: item.value
  }));
};

// Helper function to generate breakdown data for pie charts
export const generateBreakdownData = (
  breakdown: Record<string, number>
): ChartDataPoint[] => {
  return Object.entries(breakdown).map(([name, value]) => ({
    name,
    value
  }));
};
