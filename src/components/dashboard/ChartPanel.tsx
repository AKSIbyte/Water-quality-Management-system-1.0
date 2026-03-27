import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { ChartPoint, ChartParam } from "./types";

interface ChartPanelProps {
  data: ChartPoint[];
  activeParam: ChartParam;
  onParamChange: (p: ChartParam) => void;
}

const params: { key: ChartParam; label: string }[] = [
  { key: "ph", label: "pH" },
  { key: "temp", label: "Temp" },
  { key: "do", label: "DO" },
  { key: "turbidity", label: "Turbidity" },
];

const paramUnits: Record<ChartParam, string> = {
  ph: "pH",
  temp: "°C",
  do: "mg/L",
  turbidity: "NTU",
};

const CustomTooltip = ({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  unit: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 8,
        padding: "10px 14px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <p
        style={{
          color: "#6b7280",
          fontSize: 11,
          marginBottom: 6,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: entry.color,
            }}
          />
          <span
            style={{
              color: "#6b7280",
              fontSize: 11,
              fontFamily: "'Outfit', sans-serif",
              marginRight: 4,
            }}
          >
            {entry.name}:
          </span>
          <span
            style={{
              color: "#1f2937",
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
            }}
          >
            {entry.value} {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export const ChartPanel: React.FC<ChartPanelProps> = ({
  data,
  activeParam,
  onParamChange,
}) => {
  const unit = paramUnits[activeParam];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: 12,
        padding: "20px 24px",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="text-base font-semibold"
            style={{
              color: "#1f2937",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Real-Time & Predicted Trends
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            LSTM-powered prediction overlay — last 10 readings
          </p>
        </div>

        {/* Parameter toggle pills */}
        <div
          className="flex items-center gap-1 rounded-full p-1"
          style={{ background: "rgba(0,0,0,0.04)" }}
        >
          {params.map((p) => (
            <button
              key={p.key}
              onClick={() => onParamChange(p.key)}
              style={{
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
                transition: "all 0.2s ease",
                cursor: "pointer",
                border: "none",
                background:
                  activeParam === p.key
                    ? "linear-gradient(135deg, rgba(15,118,110,0.15), rgba(59,130,246,0.15))"
                    : "transparent",
                color: activeParam === p.key ? "#0f766e" : "#9ca3af",
                boxShadow:
                  activeParam === p.key
                    ? "0 0 12px rgba(15,118,110,0.15)"
                    : "none",
                outline:
                  activeParam === p.key
                    ? "1px solid rgba(15,118,110,0.2)"
                    : "none",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={{
              fill: "#9ca3af",
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
            }}
            axisLine={{ stroke: "rgba(0,0,0,0.06)" }}
            tickLine={false}
            interval={1}
          />

          <YAxis
            tick={{
              fill: "#9ca3af",
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />

          <Tooltip
            content={<CustomTooltip unit={unit} />}
            cursor={{ stroke: "rgba(0,0,0,0.08)", strokeWidth: 1 }}
          />

          <Legend
            wrapperStyle={{
              paddingTop: 16,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12,
            }}
            formatter={(value) => (
              <span style={{ color: "#6b7280" }}>{value}</span>
            )}
          />

          <Area
            type="monotone"
            dataKey="historical"
            name="Historical"
            stroke="#0f766e"
            strokeWidth={2.5}
            fill="url(#historicalGrad)"
            dot={{ fill: "#0f766e", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#0f766e", strokeWidth: 0 }}
          />

          <Area
            type="monotone"
            dataKey="predicted"
            name="Predicted"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="url(#predictedGrad)"
            dot={{ fill: "#3b82f6", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#3b82f6", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
