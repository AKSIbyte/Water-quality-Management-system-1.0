import React from "react";

interface HeaderBarProps {
  lastUpdated: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ lastUpdated }) => {
  return (
    <header
      className="flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(15,17,32,0.8)",
        borderBottom: "1px solid rgba(173,210,235,0.08)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left section - Branding */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 36,
            height: 36,
            background: "rgba(173,210,235,0.12)",
            border: "1px solid rgba(173,210,235,0.25)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z"
              fill="#add2eb"
            />
          </svg>
        </div>
        <h1
          className="text-lg font-semibold"
          style={{
            color: "#e8eef5",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          AquaFlow
        </h1>
      </div>

      {/* Center section - Navigation */}
      <div className="flex items-center gap-8">
        {["Dashboard", "Analytics", "Reports", "Settings"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm font-medium transition-colors hover:text-blue-400"
            style={{
              color: "#9ca3af",
              fontFamily: "'Outfit', sans-serif",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#add2eb")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#9ca3af")
            }
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right section - Status & Actions */}
      <div className="flex items-center gap-4">
        {/* Live status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)"}}>
          <div
            className="rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: "#10b981",
              boxShadow: "0 0 6px rgba(16,185,129,0.5)",
            }}
          />
          <span
            className="text-xs font-semibold"
            style={{
              color: "#10b981",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Live
          </span>
        </div>

        {/* Settings button */}
        <button
          style={{
            background: "rgba(173,210,235,0.08)",
            border: "1px solid rgba(173,210,235,0.15)",
            color: "#add2eb",
            width: 36,
            height: 36,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(173,210,235,0.15)";
            e.currentTarget.style.borderColor = "rgba(173,210,235,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(173,210,235,0.08)";
            e.currentTarget.style.borderColor = "rgba(173,210,235,0.15)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
          </svg>
        </button>

        {/* Profile avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            background: "linear-gradient(135deg, rgba(173,210,235,0.2), rgba(220,176,250,0.2))",
            border: "1px solid rgba(173,210,235,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          👤
        </div>
      </div>
    </header>
  );
};
