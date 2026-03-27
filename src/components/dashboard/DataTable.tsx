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
      bg: "rgba(0,229,255,0.12)",
      color: "#00e5ff",
      border: "rgba(0,229,255,0.25)",
      dot: "#00e5ff",
    },
    Warning: {
      bg: "rgba(255,179,0,0.12)",
      color: "#ffb300",
      border: "rgba(255,179,0,0.25)",
      dot: "#ffb300",
    },
    Alert: {
      bg: "rgba(255,61,87,0.12)",
      color: "#ff3d57",
      border: "rgba(255,61,87,0.25)",
      dot: "#ff3d57",
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
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px 20px",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="text-base font-semibold"
            style={{
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Recent Readings
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Last 10 sensor data points
          </p>
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-xs"
          style={{
            background: "rgba(0,229,255,0.08)",
            color: "rgba(0,229,255,0.6)",
            border: "1px solid rgba(0,229,255,0.15)",
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
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                      ? "rgba(0,229,255,0.06)"
                      : isEven
                        ? "rgba(255,255,255,0.015)"
                        : "transparent",
                    transition: "background 0.6s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "'JetBrains Mono', monospace",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {row.timestamp}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#ffffff",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {row.temp.toFixed(1)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#ffffff",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
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
                          ? "#ff3d57"
                          : row.do < 6
                            ? "#ffb300"
                            : "#00e5ff",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {row.do.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontSize: 12,
                      color: "#ffffff",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {row.turbidity.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
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
