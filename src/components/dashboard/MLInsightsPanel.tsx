import React from "react";

export const MLInsightsPanel: React.FC = () => {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px",
        backdropFilter: "blur(12px)",
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
              "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(0,229,255,0.1))",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a78bfa"
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
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            ML Insights
          </h2>
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Model performance metrics
          </p>
        </div>
      </div>

      {/* Model info rows */}
      <div className="flex flex-col gap-3">
        <InfoRow label="Model" value="LSTM" accent="#a78bfa" />
        <InfoRow label="Accuracy" value="91.4%" accent="#00e5ff" />
        <InfoRow label="Last Trained" value="2 hours ago" accent="rgba(255,255,255,0.6)" />
        <InfoRow label="Parameters" value="2.3M" accent="rgba(255,255,255,0.6)" />
        <InfoRow label="Sequence Length" value="24 steps" accent="rgba(255,255,255,0.6)" />
        <InfoRow label="Inference Time" value="~12ms" accent="#22c55e" />
      </div>

      {/* Accuracy bar */}
      <div className="mt-5">
        <div className="flex justify-between mb-1.5">
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.35)",
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
              color: "#00e5ff",
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
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: "91.4%",
              height: "100%",
              background: "linear-gradient(90deg, #00e5ff, #a78bfa)",
              borderRadius: "9999px",
              boxShadow: "0 0 8px rgba(0,229,255,0.4)",
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
              color: "rgba(255,255,255,0.35)",
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
              color: "#a78bfa",
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
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: "88.7%",
              height: "100%",
              background: "linear-gradient(90deg, #a78bfa, #c084fc)",
              borderRadius: "9999px",
              boxShadow: "0 0 8px rgba(167,139,250,0.4)",
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div
        className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          background: "rgba(34,197,94,0.06)",
          border: "1px solid rgba(34,197,94,0.15)",
        }}
      >
        <div
          className="rounded-full animate-pulse"
          style={{ width: 6, height: 6, background: "#22c55e" }}
        />
        <span
          style={{
            fontSize: 11,
            color: "#22c55e",
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
        color: "rgba(255,255,255,0.35)",
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
