import React from "react";

export const MLInsightsPanel: React.FC = () => {
  return (
    <div
      style={{
        background: "rgba(15,18,38,0.6)",
        border: "1px solid rgba(6,182,212,0.1)",
        borderRadius: 10,
        padding: "16px",
        backdropFilter: "blur(8px)",
        height: "100%",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 32,
            height: 32,
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.2)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h2
            className="text-sm font-semibold"
            style={{
              color: "#f5f7fa",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            ML Insights
          </h2>
          <p
            className="text-xs"
            style={{
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Model performance
          </p>
        </div>
      </div>

      {/* Model info rows */}
      <div className="flex flex-col gap-3">
        <InfoRow label="Model" value="LSTM" accent="#06b6d4" />
        <InfoRow label="Accuracy" value="91.4%" accent="#06b6d4" />
        <InfoRow label="Last Trained" value="2 hours ago" accent="#6b7280" />
        <InfoRow label="Parameters" value="2.3M" accent="#6b7280" />
        <InfoRow label="Sequence Length" value="24 steps" accent="#6b7280" />
        <InfoRow label="Inference Time" value="~12ms" accent="#06b6d4" />
      </div>

      {/* Accuracy bar */}
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span
            style={{
              fontSize: 9,
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Model Accuracy
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#06b6d4",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
            }}
          >
            91.4%
          </span>
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{
            height: 5,
            background: "rgba(6,182,212,0.08)",
          }}
        >
          <div
            style={{
              width: "91.4%",
              height: "100%",
              background: "linear-gradient(90deg, #06b6d4, #22d3ee)",
              borderRadius: "9999px",
              boxShadow: "0 0 6px rgba(6,182,212,0.2)",
              transition: "width 1s ease",
            }}
          />
        </div>
      </div>

      {/* F1 Score bar */}
      <div className="mt-3">
        <div className="flex justify-between mb-1">
          <span
            style={{
              fontSize: 9,
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            F1 Score
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#f97316",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
            }}
          >
            88.7%
          </span>
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{
            height: 5,
            background: "rgba(249,115,22,0.08)",
          }}
        >
          <div
            style={{
              width: "88.7%",
              height: "100%",
              background: "linear-gradient(90deg, #f97316, #fb923c)",
              borderRadius: "9999px",
              boxShadow: "0 0 6px rgba(249,115,22,0.2)",
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div
        className="mt-3 flex items-center gap-2 rounded-lg px-2.5 py-1.5"
        style={{
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.15)",
        }}
      >
        <div
          className="rounded-full animate-pulse"
          style={{ width: 5, height: 5, background: "#06b6d4" }}
        />
        <span
          style={{
            fontSize: 10,
            color: "#06b6d4",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Production ready
        </span>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{
  label: string;
  value: string;
  accent: string;
}> = ({ label, value, accent }) => (
  <div className="flex items-center justify-between">
    <span
      style={{
        fontSize: 11,
        color: "#6b7280",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: 11,
        color: accent,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
      }}
    >
      {value}
    </span>
  </div>
);
