import React from "react";

interface HeaderBarProps {
  lastUpdated: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ lastUpdated }) => {
  return (
    <header
      className="flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(15,17,32,0.8)",
        borderBottom: "1px solid rgba(173,210,235,0.08)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div className="flex items-center gap-4">
        {/* Logo mark */}
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, rgba(173,210,235,0.15), rgba(220,176,250,0.15))",
            border: "1px solid rgba(173,210,235,0.2)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z"
              fill="#add2eb"
            />
          </svg>
        </div>

        <div>
          <h1
            className="text-xl font-bold tracking-wide leading-none"
            style={{
              color: "#e8eef5",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Water Quality{" "}
            <span style={{ color: "#add2eb" }}>Monitoring System</span>
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#7080a0",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Real-time environmental intelligence platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: 12,
                height: 12,
                backgroundColor: "rgba(16,185,129,0.4)",
                animationDuration: "1.5s",
              }}
            />
            <div
              className="rounded-full relative z-10"
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#10b981",
                boxShadow: "0 0 8px rgba(16,185,129,0.6)",
              }}
            />
          </div>
          <span
            className="text-sm font-semibold tracking-widest"
            style={{
              color: "#10b981",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            LIVE
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            background: "rgba(173,210,235,0.1)",
          }}
        />

        {/* Timestamp */}
        <div className="text-right">
          <p
            className="text-xs"
            style={{
              color: "#7080a0",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Last updated
          </p>
          <p
            className="text-sm font-medium"
            style={{
              color: "#c8d4e8",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {lastUpdated}
          </p>
        </div>

        {/* System status badge */}
        <div
          className="px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            color: "#10b981",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          All sensors online
        </div>
      </div>
    </header>
  );
};
