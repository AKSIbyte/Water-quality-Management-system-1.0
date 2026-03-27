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
        background: "rgba(15,18,38,0.6)",
        border: "1px solid rgba(6,182,212,0.1)",
        borderRadius: 10,
        padding: "16px",
        backdropFilter: "blur(8px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-sm font-semibold"
            style={{
              color: "#f5f7fa",
              fontFamily: "'Space Grotesk', sans-serif",
              margin: 0,
            }}
          >
            Alert Feed
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
              margin: 0,
            }}
          >
            Real-time anomalies
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-lg w-6 h-6 text-xs font-bold"
          style={{
            background:
              alerts.length > 0 ? "rgba(236,72,153,0.1)" : "rgba(6,182,212,0.05)",
            color: alerts.length > 0 ? "#ec4899" : "#6b7280",
            border: `1px solid ${alerts.length > 0 ? "rgba(236,72,153,0.2)" : "rgba(6,182,212,0.1)"}`,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {alerts.length}
        </div>
      </div>

      <div
        className="flex flex-col gap-2 flex-1"
        style={{
          overflowY: "auto",
        }}
      >
        {alerts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-8"
            style={{ color: "#4b5563" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mb-2"
              style={{ color: "rgba(6,182,212,0.3)" }}
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p
              className="text-xs"
              style={{
                color: "#06b6d4",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              All systems nominal
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
  const color = isAlert ? "#ec4899" : "#f5f7fa";
  const bgColor = "rgba(15,18,38,0.8)";
  const borderColor = isAlert
    ? "rgba(236,72,153,0.3)"
    : "rgba(255,255,255,0.2)";

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
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
                color: "#9ca3af",
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
            color: "#6b7280",
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
            ((e.target as HTMLButtonElement).style.color = "#ef4444")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.color = "#6b7280")
          }
        >
          ✕
        </button>
      </div>
    </div>
  );
};

