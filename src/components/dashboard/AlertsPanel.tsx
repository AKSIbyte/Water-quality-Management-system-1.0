import React from "react";
import type { AlertItem } from "./types";

interface AlertsPanelProps {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  onDismiss,
}) => {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: 12,
        padding: "20px",
        backdropFilter: "blur(8px)",
        height: "100%",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="text-base font-semibold"
            style={{
              color: "#1f2937",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Alert Feed
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Real-time anomaly detection
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-full w-7 h-7 text-xs font-bold"
          style={{
            background:
              alerts.length > 0 ? "rgba(220,38,38,0.1)" : "rgba(0,0,0,0.04)",
            color: alerts.length > 0 ? "#dc2626" : "#9ca3af",
            border: `1px solid ${alerts.length > 0 ? "rgba(220,38,38,0.2)" : "rgba(0,0,0,0.05)"}`,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {alerts.length}
        </div>
      </div>

      <div className="flex flex-col gap-2" style={{ maxHeight: 340, overflowY: "auto" }}>
        {alerts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-8"
            style={{ color: "#d1d5db" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mb-2"
              style={{ color: "rgba(34,197,94,0.4)" }}
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p
              className="text-xs"
              style={{
                color: "#16a34a",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              All parameters nominal
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <AlertBox key={alert.id} alert={alert} onDismiss={onDismiss} />
          ))
        )}
      </div>
    </div>
  );
};

const AlertBox: React.FC<{
  alert: AlertItem;
  onDismiss: (id: string) => void;
}> = ({ alert, onDismiss }) => {
  const [exiting, setExiting] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss(alert.id), 300);
  };

  const isAlert = alert.type === "alert";
  const color = isAlert ? "#dc2626" : "#b45309";
  const bgColor = isAlert
    ? "rgba(220,38,38,0.08)"
    : "rgba(180,83,9,0.08)";
  const borderColor = isAlert
    ? "rgba(220,38,38,0.15)"
    : "rgba(180,83,9,0.15)";

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: "10px 12px",
        transition: "all 0.3s ease",
        transform: exiting
          ? "translateX(100%)"
          : visible
            ? "translateX(0)"
            : "translateX(-20px)",
        opacity: exiting ? 0 : visible ? 1 : 0,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span style={{ color, fontSize: 14, marginTop: 1 }}>
            {isAlert ? "🚨" : "⚠️"}
          </span>
          <div>
            <p
              className="text-sm font-medium leading-tight"
              style={{
                color,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {isAlert ? "CRITICAL ALERT" : "WARNING"}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{
                color: "#6b7280",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {alert.message}
            </p>
            <p
              className="text-xs mt-1.5"
              style={{
                color: "#d1d5db",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {alert.timestamp}
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          style={{
            color: "#9ca3af",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            lineHeight: 1,
            padding: "2px 4px",
            borderRadius: 4,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.color = "#374151")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.color = "#9ca3af")
          }
        >
          ✕
        </button>
      </div>
    </div>
  );
};
