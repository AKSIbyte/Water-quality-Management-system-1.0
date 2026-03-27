import React from "react";
import type { WaterReading, PredictionStatus } from "./types";

interface DataTableProps {
  readings: WaterReading[];
  newRowId?: string;
}

const PredictionBadge: React.FC<{ status: PredictionStatus }> = ({
  status,
}) => {
  const styles = {
    Safe: {
      bg: "rgba(6,182,212,0.1)",
      color: "#06b6d4",
      border: "rgba(6,182,212,0.2)",
      dot: "#06b6d4",
    },
    Warning: {
      bg: "rgba(249,115,22,0.1)",
      color: "#f97316",
      border: "rgba(249,115,22,0.2)",
      dot: "#f97316",
    },
    Alert: {
      bg: "rgba(236,72,153,0.1)",
      color: "#ec4899",
      border: "rgba(236,72,153,0.2)",
      dot: "#ec4899",
    },
  };
  const s = styles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: "0.06em",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: s.dot,
          display: "inline-block",
        }}
      />
      {status.toUpperCase()}
    </span>
  );
};

export const DataTable: React.FC<DataTableProps> = ({ readings, newRowId }) => {
  return (
    <div
      style={{
        background: "rgba(15,18,38,0.6)",
        border: "1px solid rgba(6,182,212,0.1)",
        borderRadius: 10,
        padding: "16px",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-sm font-semibold"
            style={{
              color: "#f5f7fa",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Recent Readings
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Last 10 sensor readings
          </p>
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-xs"
          style={{
            background: "rgba(6,182,212,0.1)",
            color: "#06b6d4",
            border: "1px solid rgba(6,182,212,0.2)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Auto-updating
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Timestamp", "Temp (°C)", "pH", "DO (mg/L)", "Turbidity (NTU)", "Prediction"].map(
                (col) => (
                  <th
                    key={col}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      fontSize: 10,
                      color: "#6b7280",
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(6,182,212,0.08)",
                    }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {readings.map((row, i) => {
              const isNew = newRowId === row.timestamp;
              const isEven = i % 2 === 0;
              return (
                <tr
                  key={`${row.timestamp}-${i}`}
                  style={{
                    background: isNew
                      ? "rgba(6,182,212,0.08)"
                      : isEven
                        ? "rgba(6,182,212,0.02)"
                        : "transparent",
                    transition: "background 0.6s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 11,
                      color: "#9ca3af",
                      fontFamily: "'JetBrains Mono', monospace",
                      borderBottom: "1px solid rgba(6,182,212,0.04)",
                    }}
                  >
                    {row.timestamp}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#e5e7eb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(59,130,246,0.04)",
                    }}
                  >
                    {row.temp.toFixed(1)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#e5e7eb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(59,130,246,0.04)",
                    }}
                  >
                    {row.ph.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color:
                        row.do < 5
                          ? "#ef4444"
                          : row.do < 6
                            ? "#f59e0b"
                            : "#3b82f6",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(59,130,246,0.04)",
                    }}
                  >
                    {row.do.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#e5e7eb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(59,130,246,0.04)",
                    }}
                  >
                    {row.turbidity.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      borderBottom: "1px solid rgba(59,130,246,0.04)",
                    }}
                  >
                    <PredictionBadge status={row.prediction} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
