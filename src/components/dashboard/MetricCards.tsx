import React from "react";
import type { MetricData, MetricDelta, PredictionStatus } from "./types";

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  status: "safe" | "warning" | "alert";
  delta: number;
  deltaPositiveGood?: boolean;
  delay?: number;
  isVisible?: boolean;
}

const statusColors = {
  safe: {
    accent: "#add2eb",
    bg: "rgba(173,210,235,0.08)",
    border: "rgba(173,210,235,0.2)",
    glow: "rgba(173,210,235,0.12)",
    badge: "rgba(173,210,235,0.12)",
    badgeText: "#add2eb",
    badgeBorder: "rgba(173,210,235,0.25)",
    label: "OPTIMAL",
  },
  warning: {
    accent: "#dcb0fa",
    bg: "rgba(220,176,250,0.08)",
    border: "rgba(220,176,250,0.2)",
    glow: "rgba(220,176,250,0.12)",
    badge: "rgba(220,176,250,0.12)",
    badgeText: "#dcb0fa",
    badgeBorder: "rgba(220,176,250,0.25)",
    label: "WARNING",
  },
  alert: {
    accent: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
    glow: "rgba(249,115,22,0.12)",
    badge: "rgba(249,115,22,0.12)",
    badgeText: "#f97316",
    badgeBorder: "rgba(249,115,22,0.25)",
    label: "ALERT",
  },
};

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  icon,
  status,
  delta,
  deltaPositiveGood = true,
  delay = 0,
  isVisible = true,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const colors = statusColors[status];
  const isUp = delta >= 0;
  const trendGood = deltaPositiveGood ? isUp : !isUp;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(26,31,58,0.95)" : "rgba(20,24,44,0.85)",
        border: `1px solid ${hovered ? colors.border : "rgba(173,210,235,0.08)"}`,
        borderRadius: 12,
        padding: "20px 20px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-4px)" : isVisible ? "translateY(0)" : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
        backdropFilter: "blur(8px)",
        boxShadow: hovered
          ? `0 16px 32px rgba(0,0,0,0.3), 0 0 0 1px ${colors.border}`
          : "0 2px 12px rgba(0,0,0,0.2)",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        cursor: "default",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 42,
            height: 42,
            background: `${colors.bg}`,
            border: `1px solid ${colors.border}`,
            color: colors.accent,
          }}
        >
          {icon}
        </div>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: colors.badge,
            border: `1px solid ${colors.badgeBorder}`,
            color: colors.badgeText,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          <span
            className="rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: colors.accent,
              display: "inline-block",
            }}
          />
          {colors.label}
        </div>
      </div>

      {/* Label */}
      <p
        className="text-xs mb-1"
        style={{
          color: "#9ca3af",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span
          className="text-3xl font-bold leading-none"
          style={{
            color: colors.accent,
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: "none",
          }}
        >
          {value}
        </span>
        <span
          className="text-sm mb-0.5"
          style={{
            color: "#6b7280",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {unit}
        </span>
      </div>

      {/* Trend */}
      <div className="flex items-center gap-1 mt-2">
        <span
          className="text-sm font-semibold"
          style={{
            color: trendGood ? "#10b981" : "#f97316",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {isUp ? "↑" : "↓"} {Math.abs(delta).toFixed(2)}
        </span>
        <span
          className="text-xs"
          style={{ color: "#4b5563", fontFamily: "'Outfit', sans-serif" }}
        >
          vs last reading
        </span>
      </div>
    </div>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const PhIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4v16M4 8h8a4 4 0 0 1 0 8H4" />
    <path d="M15 12h5M17.5 9v6" />
  </svg>
);
const TempIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);
const OxygenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const TurbidityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z" />
    <path d="M9 14a3 3 0 0 0 6 0" />
  </svg>
);
const PredictionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─── Compound component ───────────────────────────────────────────────────────

interface MetricCardsProps {
  metrics: MetricData;
  deltas: MetricDelta;
  isVisible: boolean;
}

function getPhStatus(ph: number): "safe" | "warning" | "alert" {
  if (ph >= 6.5 && ph <= 8.5) return "safe";
  if (ph >= 6 && ph <= 9) return "warning";
  return "alert";
}
function getTempStatus(temp: number): "safe" | "warning" | "alert" {
  if (temp >= 15 && temp <= 30) return "safe";
  if (temp <= 35) return "warning";
  return "alert";
}
function getDoStatus(doVal: number): "safe" | "warning" | "alert" {
  if (doVal >= 6) return "safe";
  if (doVal >= 5) return "warning";
  return "alert";
}
function getTurbidityStatus(t: number): "safe" | "warning" | "alert" {
  if (t <= 5) return "safe";
  if (t <= 10) return "warning";
  return "alert";
}
function getPredictionStatus(p: PredictionStatus): "safe" | "warning" | "alert" {
  if (p === "Safe") return "safe";
  if (p === "Warning") return "warning";
  return "alert";
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  metrics,
  deltas,
  isVisible,
}) => {
  const cards = [
    {
      label: "pH Level",
      value: metrics.ph.toFixed(2),
      unit: "pH",
      icon: <PhIcon />,
      status: getPhStatus(metrics.ph),
      delta: deltas.ph,
      deltaPositiveGood: false,
      delay: 0,
    },
    {
      label: "Temperature",
      value: metrics.temp.toFixed(1),
      unit: "°C",
      icon: <TempIcon />,
      status: getTempStatus(metrics.temp),
      delta: deltas.temp,
      deltaPositiveGood: false,
      delay: 100,
    },
    {
      label: "Dissolved Oxygen",
      value: metrics.dissolvedOxygen.toFixed(2),
      unit: "mg/L",
      icon: <OxygenIcon />,
      status: getDoStatus(metrics.dissolvedOxygen),
      delta: deltas.dissolvedOxygen,
      deltaPositiveGood: true,
      delay: 200,
    },
    {
      label: "Turbidity",
      value: metrics.turbidity.toFixed(2),
      unit: "NTU",
      icon: <TurbidityIcon />,
      status: getTurbidityStatus(metrics.turbidity),
      delta: deltas.turbidity,
      deltaPositiveGood: false,
      delay: 300,
    },
    {
      label: "Prediction Status",
      value: metrics.prediction,
      unit: "",
      icon: <PredictionIcon />,
      status: getPredictionStatus(metrics.prediction),
      delta: 0,
      deltaPositiveGood: true,
      delay: 400,
    },
  ] as const;

  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map((card) => (
        <MetricCard
          key={card.label}
          label={card.label}
          value={card.value}
          unit={card.unit}
          icon={card.icon}
          status={card.status}
          delta={card.delta}
          deltaPositiveGood={card.deltaPositiveGood}
          delay={card.delay}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
};
