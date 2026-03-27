import React, { useState, useEffect, useCallback, useRef } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { MetricCards } from "./MetricCards";
import { ChartPanel } from "./ChartPanel";
import { AlertsPanel } from "./AlertsPanel";
import { DataTable } from "./DataTable";
import { MLInsightsPanel } from "./MLInsightsPanel";
import type {
  MetricData,
  MetricDelta,
  WaterReading,
  ChartPoint,
  AlertItem,
  ChartParam,
} from "./types";
import {
  generateInitialData,
  generateNextMetrics,
  formatTimestamp,
  toReading,
  metricsToChartPoint,
  buildInitialChart,
} from "./utils";

const WaterQualityDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [metrics, setMetrics] = useState<MetricData>(generateInitialData());
  const [prevMetrics, setPrevMetrics] = useState<MetricData>(generateInitialData());
  const [readings, setReadings] = useState<WaterReading[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [activeParam, setActiveParam] = useState<ChartParam>("do");
  const [lastUpdated, setLastUpdated] = useState(formatTimestamp());
  const [latestRowTimestamp, setLatestRowTimestamp] = useState<string>("");

  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;

  // Initialize data
  useEffect(() => {
    const initial = generateInitialData();
    setMetrics(initial);
    setPrevMetrics(initial);
    const initialReadings: WaterReading[] = [];
    let cur = initial;
    for (let i = 0; i < 10; i++) {
      initialReadings.unshift(toReading(cur));
      cur = generateNextMetrics(cur);
    }
    setReadings(initialReadings);
    setChartData(buildInitialChart(initial, "do"));
  }, []);

  const handleParamChange = useCallback(
    (param: ChartParam) => {
      setActiveParam(param);
      setChartData(buildInitialChart(metricsRef.current, param));
    },
    []
  );

  const handleDone = useCallback(() => {
    setLoading(false);
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleDismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Real-time simulation
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setMetrics((prev) => {
        const next = generateNextMetrics(prev);
        setPrevMetrics(prev);

        const ts = formatTimestamp();
        setLastUpdated(ts);

        // Update readings
        const newReading = toReading(next);
        newReading.timestamp = ts;
        setLatestRowTimestamp(ts);
        setReadings((r) => [newReading, ...r].slice(0, 10));

        // Update chart
        const { historical, predicted } = metricsToChartPoint(
          next,
          activeParam
        );
        setChartData((cd) =>
          [...cd, { time: ts, historical, predicted }].slice(-15)
        );

        // Generate alerts
        if (next.prediction === "Alert") {
          const newAlert: AlertItem = {
            id: `alert-${Date.now()}`,
            type: "alert",
            message: `Critical DO level: ${next.dissolvedOxygen.toFixed(2)} mg/L — immediate action required`,
            timestamp: ts,
          };
          setAlerts((a) => [newAlert, ...a].slice(0, 5));
        } else if (next.prediction === "Warning") {
          const newWarn: AlertItem = {
            id: `warn-${Date.now()}`,
            type: "warning",
            message: `DO dropping to ${next.dissolvedOxygen.toFixed(2)} mg/L — monitor closely`,
            timestamp: ts,
          };
          setAlerts((a) => [newWarn, ...a].slice(0, 5));
        }

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [loading, activeParam]);

  const deltas: MetricDelta = {
    ph: +(metrics.ph - prevMetrics.ph).toFixed(3),
    temp: +(metrics.temp - prevMetrics.temp).toFixed(2),
    dissolvedOxygen: +(metrics.dissolvedOxygen - prevMetrics.dissolvedOxygen).toFixed(3),
    turbidity: +(metrics.turbidity - prevMetrics.turbidity).toFixed(3),
  };

  if (loading) {
    return <LoadingScreen onDone={handleDone} />;
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "#0f1419",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          background: "#0a0d1a",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #06b6d4, #0891b2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            💧
          </div>
          <span
            style={{
              color: "#f5f7fa",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            AquaSense
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {["Dashboard", "Analytics"].map((item, idx) => (
            <a
              key={item}
              href={item === "Analytics" ? "#analytics-section" : "#"}
              className="px-3 py-2 rounded-lg text-sm transition-all"
              style={{
                color: idx === 0 ? "#06b6d4" : "#9ca3af",
                background: idx === 0 ? "rgba(6,182,212,0.1)" : "transparent",
                borderLeft: idx === 0 ? "3px solid #06b6d4" : "3px solid transparent",
                paddingLeft: idx === 0 ? "12px" : "15px",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "#0f1419",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div>
<h1
              style={{
                color: "#f5f7fa",
                fontSize: 28,
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                margin: 0,
              }}
            >
              Monitoring System
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 12,
                marginTop: 4,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Here's what's happening with your water systems
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#9ca3af",
                fontSize: 12,
                margin: "0 0 4px 0",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {lastUpdated}
            </p>
            <div className="flex items-center gap-1.5">
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                }}
              />
              <span
                style={{
                  color: "#10b981",
                  fontSize: 12,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                All systems online
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: "24px 32px",
          }}
        >
          {/* Metric Cards Row */}
          <section className="mb-8">
            <MetricCards
              metrics={metrics}
              deltas={deltas}
              isVisible={visible}
            />
          </section>

          {/* Charts Grid */}
          <section className="grid gap-6 mb-8" style={{ gridTemplateColumns: "2fr 1fr" }}>
            {/* Main Chart */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 500ms",
              }}
            >
              <ChartPanel
                data={chartData}
                activeParam={activeParam}
                onParamChange={handleParamChange}
              />
            </div>

            {/* Alerts */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 600ms",
              }}
            >
              <AlertsPanel alerts={alerts} onDismiss={handleDismissAlert} />
            </div>
          </section>

          {/* Bottom Section */}
          <section className="grid gap-6 mb-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 700ms",
              }}
            >
              <DataTable readings={readings} newRowId={latestRowTimestamp} />
            </div>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 800ms",
              }}
            >
              <MLInsightsPanel />
            </div>
          </section>

          {/* Analytics Section */}
          <section id="analytics-section" className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <h2
              style={{
                color: "#f5f7fa",
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: 24,
              }}
            >
              Analytics Overview
            </h2>
            <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div
                style={{
                  background: "rgba(15,18,38,0.6)",
                  border: "1px solid rgba(6,182,212,0.1)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 12,
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: 12,
                  }}
                >
                  TOTAL READINGS
                </p>
                <p
                  style={{
                    color: "#06b6d4",
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    margin: 0,
                  }}
                >
                  {readings.length}
                </p>
              </div>
              <div
                style={{
                  background: "rgba(15,18,38,0.6)",
                  border: "1px solid rgba(249,115,22,0.1)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 12,
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: 12,
                  }}
                >
                  ACTIVE ALERTS
                </p>
                <p
                  style={{
                    color: "#f97316",
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    margin: 0,
                  }}
                >
                  {alerts.length}
                </p>
              </div>
              <div
                style={{
                  background: "rgba(15,18,38,0.6)",
                  border: "1px solid rgba(168,85,247,0.1)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: 12,
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: 12,
                  }}
                >
                  MODEL ACCURACY
                </p>
                <p
                  style={{
                    color: "#a855f7",
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    margin: 0,
                  }}
                >
                  91.4%
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WaterQualityDashboard;
