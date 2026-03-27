import React, { useState, useEffect, useCallback, useRef } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { HeaderBar } from "./HeaderBar";
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
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0f1419 0%, #1a1f3a 50%, #151b2f 100%)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <HeaderBar lastUpdated={lastUpdated} />

        <main className="px-6 py-5" style={{ maxWidth: 1600, margin: "0 auto" }}>
          {/* Metric Cards */}
          <section className="mb-5">
            <MetricCards
              metrics={metrics}
              deltas={deltas}
              isVisible={visible}
            />
          </section>

          {/* Chart + Alerts row */}
          <section className="grid gap-4 mb-4" style={{ gridTemplateColumns: "1fr 300px" }}>
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

          {/* Table + ML Insights row */}
          <section className="grid gap-4" style={{ gridTemplateColumns: "1fr 280px" }}>
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
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-4 mt-4 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: 11,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            AI Water Quality Monitoring System — LSTM Predictive Engine v2.1 — Simulated Data for Research Purposes
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WaterQualityDashboard;
