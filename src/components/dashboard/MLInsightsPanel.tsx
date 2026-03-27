import React from "react";

export const MLInsightsPanel: React.FC = () => {
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
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 36,
            height: 36,
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(15,118,110,0.1))",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h2
            className="text-base font-semibold"
            style={{
              color: "#1f2937",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            ML Insights
          </h2>
          <p
            className="text-xs"
            style={{
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Model performance metrics
          </p>
        </div>
      </div>

      {/* Model info rows */}
      <div className="flex flex-col gap-3">
        <InfoRow label="Model" value="LSTM" accent="#3b82f6" />
        <InfoRow label="Accuracy" value="91.4%" accent="#0f766e" />
        <InfoRow label="Last Trained" value="2 hours ago" accent="#6b7280" />
        <InfoRow label="Parameters" value="2.3M" accent="#6b7280" />
        <InfoRow label="Sequence Length" value="24 steps" accent="#6b7280" />
        <InfoRow label="Inference Time" value="~12ms" accent="#16a34a" />
      </div>

      {/* Accuracy bar */}
      <div className="mt-5">
        <div className="flex justify-between mb-1.5">
          <span
            style={{
              fontSize: 10,
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Model Accuracy
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#0f766e",
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
            height: 6,
            background: "rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: "91.4%",
              height: "100%",
              background: "linear-gradient(90deg, #0f766e, #3b82f6)",
              borderRadius: "9999px",
              boxShadow: "0 0 8px rgba(15,118,110,0.3)",
              transition: "width 1s ease",
            }}
          />
        </div>
      </div>

      {/* F1 Score bar */}
      <div className="mt-3">
        <div className="flex justify-between mb-1.5">
          <span
            style={{
              fontSize: 10,
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            F1 Score
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#3b82f6",
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
            height: 6,
            background: "rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: "88.7%",
              height: "100%",
              background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
              borderRadius: "9999px",
              boxShadow: "0 0 8px rgba(59,130,246,0.3)",
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div
        className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.15)",
        }}
      >
        <div
          className="rounded-full animate-pulse"
          style={{ width: 6, height: 6, background: "#16a34a" }}
        />
        <span
          style={{
            fontSize: 11,
            color: "#16a34a",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Model serving — production ready
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
        color: "#9ca3af",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: 12,
        color: accent,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
      }}
    >
      {value}
    </span>
  </div>
);
