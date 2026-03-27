import React from "react";

interface HeaderBarProps {
  lastUpdated: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ lastUpdated }) => {
  return (
    <header
      className="flex items-center justify-between px-6 py-3"
      style={{
        background: "rgba(10,14,39,0.8)",
        borderBottom: "1px solid rgba(59,130,246,0.1)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Logo mark */}
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 36,
            height: 36,
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z"
              fill="#3b82f6"
            />
          </svg>
        </div>

        <div>
          <h1
            className="text-sm font-semibold leading-none"
            style={{
              color: "#f5f7fa",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Water Quality{" "}
            <span style={{ color: "#3b82f6" }}>Monitoring System</span>
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Real-time environmental intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                width: 10,
                height: 10,
                backgroundColor: "rgba(59,130,246,0.3)",
                animationDuration: "1.8s",
              }}
            />
            <div
              className="rounded-full relative z-10"
              style={{
                width: 6,
                height: 6,
                backgroundColor: "#3b82f6",
                boxShadow: "0 0 6px rgba(59,130,246,0.5)",
              }}
            />
          </div>
          <span
            className="text-xs font-semibold tracking-wider"
            style={{
              color: "#3b82f6",
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
            height: 20,
            background: "rgba(107,114,128,0.2)",
          }}
        />

        {/* Timestamp */}
        <div className="text-right">
          <p
            className="text-xs"
            style={{
              color: "#6b7280",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Last updated
          </p>
          <p
            className="text-xs font-medium"
            style={{
              color: "#e5e7eb",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {lastUpdated}
          </p>
        </div>

        {/* System status badge */}
        <div
          className="px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#3b82f6",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          All sensors online
        </div>
      </div>
    </header>
  );
};
