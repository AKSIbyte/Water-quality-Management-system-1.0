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
        background: "rgba(10,15,30,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        padding: "10px 14px",
        backdropFilter: "blur(8px)",
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.5)",
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
              color: "rgba(255,255,255,0.6)",
              fontSize: 11,
              fontFamily: "'Outfit', sans-serif",
              marginRight: 4,
            }}
          >
            {entry.name}:
          </span>
          <span
            style={{
              color: "#ffffff",
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
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px 24px",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="text-base font-semibold"
            style={{
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Real-Time & Predicted Trends
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            LSTM-powered prediction overlay — last 10 readings
          </p>
        </div>

        {/* Parameter toggle pills */}
        <div
          className="flex items-center gap-1 rounded-full p-1"
          style={{ background: "rgba(255,255,255,0.05)" }}
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
                    ? "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(167,139,250,0.25))"
                    : "transparent",
                color: activeParam === p.key ? "#00e5ff" : "rgba(255,255,255,0.4)",
                boxShadow:
                  activeParam === p.key
                    ? "0 0 12px rgba(0,229,255,0.2)"
                    : "none",
                outline:
                  activeParam === p.key
                    ? "1px solid rgba(0,229,255,0.3)"
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
              <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={{
              fill: "rgba(255,255,255,0.3)",
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
            }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
            interval={1}
          />

          <YAxis
            tick={{
              fill: "rgba(255,255,255,0.3)",
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />

          <Tooltip
            content={<CustomTooltip unit={unit} />}
            cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
          />

          <Legend
            wrapperStyle={{
              paddingTop: 16,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12,
            }}
            formatter={(value) => (
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{value}</span>
            )}
          />

          <Area
            type="monotone"
            dataKey="historical"
            name="Historical"
            stroke="#00e5ff"
            strokeWidth={2.5}
            fill="url(#historicalGrad)"
            dot={{ fill: "#00e5ff", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#00e5ff", strokeWidth: 0 }}
          />

          <Area
            type="monotone"
            dataKey="predicted"
            name="Predicted"
            stroke="#a78bfa"
            strokeWidth={2}
            strokeDasharray="6 3"
            fill="url(#predictedGrad)"
            dot={{ fill: "#a78bfa", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#a78bfa", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
