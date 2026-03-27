import React from "react";

interface LoadingScreenProps {
  onDone: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onDone }) => {
  React.useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 100%)" }}
    >
      {/* Water ripple rings */}
      <div className="relative flex items-center justify-center mb-8">
        <div
          className="absolute rounded-full border-2 animate-ping"
          style={{
            width: 120,
            height: 120,
            borderColor: "rgba(0,229,255,0.3)",
            animationDuration: "1.4s",
          }}
        />
        <div
          className="absolute rounded-full border-2 animate-ping"
          style={{
            width: 90,
            height: 90,
            borderColor: "rgba(0,229,255,0.5)",
            animationDuration: "1.4s",
            animationDelay: "0.3s",
          }}
        />
        <div
          className="absolute rounded-full border-2 animate-ping"
          style={{
            width: 60,
            height: 60,
            borderColor: "rgba(0,229,255,0.7)",
            animationDuration: "1.4s",
            animationDelay: "0.6s",
          }}
        />
        {/* Center droplet */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: 56,
            height: 56,
            background:
              "radial-gradient(circle at 40% 35%, rgba(0,229,255,0.9), rgba(0,100,180,0.8))",
            boxShadow: "0 0 30px rgba(0,229,255,0.6), 0 0 60px rgba(0,229,255,0.3)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z"
              fill="rgba(255,255,255,0.9)"
            />
          </svg>
        </div>
      </div>

      <h1
        className="text-3xl font-bold tracking-widest mb-2"
        style={{
          color: "#00e5ff",
          textShadow: "0 0 20px rgba(0,229,255,0.5)",
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.15em",
        }}
      >
        AI WATER QUALITY
      </h1>
      <p
        className="text-sm tracking-widest mb-8"
        style={{
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        Monitoring System
      </p>

      {/* Progress bar */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: 200,
          height: 3,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #00e5ff, #a78bfa)",
            boxShadow: "0 0 8px rgba(0,229,255,0.6)",
            animation: "loading-progress 1.6s ease-in-out forwards",
          }}
        />
      </div>

      <p
        className="mt-4 text-xs"
        style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}
      >
        INITIALIZING SENSORS...
      </p>

      <style>{`
        @keyframes loading-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};
