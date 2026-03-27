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
      bg: "rgba(15,118,110,0.08)",
      color: "#0f766e",
      border: "rgba(15,118,110,0.15)",
      dot: "#0f766e",
    },
    Warning: {
      bg: "rgba(180,83,9,0.08)",
      color: "#b45309",
      border: "rgba(180,83,9,0.15)",
      dot: "#b45309",
    },
    Alert: {
      bg: "rgba(220,38,38,0.08)",
      color: "#dc2626",
      border: "rgba(220,38,38,0.15)",
      dot: "#dc2626",
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
        background: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: 12,
        padding: "20px 20px",
        backdropFilter: "blur(8px)",
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
            Recent Readings
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Last 10 sensor data points
          </p>
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-xs"
          style={{
            background: "rgba(15,118,110,0.08)",
            color: "#0f766e",
            border: "1px solid rgba(15,118,110,0.15)",
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
                      color: "#9ca3af",
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
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
                      ? "rgba(15,118,110,0.06)"
                      : isEven
                        ? "rgba(0,0,0,0.01)"
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
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
                    }}
                  >
                    {row.timestamp}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#1f2937",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
                    }}
                  >
                    {row.temp.toFixed(1)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#1f2937",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
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
                          ? "#dc2626"
                          : row.do < 6
                            ? "#b45309"
                            : "#0f766e",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
                    }}
                  >
                    {row.do.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#1f2937",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
                    }}
                  >
                    {row.turbidity.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
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
