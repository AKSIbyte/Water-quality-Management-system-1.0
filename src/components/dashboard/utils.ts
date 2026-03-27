import type { MetricData, WaterReading, ChartPoint, PredictionStatus } from "./types";

export function getPrediction(dissolvedOxygen: number): PredictionStatus {
  if (dissolvedOxygen < 5) return "Alert";
  if (dissolvedOxygen < 6) return "Warning";
  return "Safe";
}

export function generateInitialData(): MetricData {
  return {
    ph: 7.2,
    temp: 28.0,
    dissolvedOxygen: 6.5,
    turbidity: 3.1,
    prediction: "Safe",
  };
}

export function fluctuate(value: number, range: number): number {
  return +(value + (Math.random() - 0.5) * range * 2).toFixed(2);
}

export function generateNextMetrics(prev: MetricData): MetricData {
  const dissolvedOxygen = Math.max(
    2,
    Math.min(12, fluctuate(prev.dissolvedOxygen, 0.3))
  );
  return {
    ph: Math.max(5, Math.min(9, fluctuate(prev.ph, 0.1))),
    temp: Math.max(15, Math.min(40, fluctuate(prev.temp, 0.5))),
    dissolvedOxygen,
    turbidity: Math.max(0.5, Math.min(20, fluctuate(prev.turbidity, 0.4))),
    prediction: getPrediction(dissolvedOxygen),
  };
}

export function formatTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function toReading(metrics: MetricData): WaterReading {
  return {
    timestamp: formatTimestamp(),
    temp: metrics.temp,
    ph: metrics.ph,
    do: metrics.dissolvedOxygen,
    turbidity: metrics.turbidity,
    prediction: metrics.prediction,
  };
}

export function metricsToChartPoint(
  metrics: MetricData,
  param: "ph" | "temp" | "do" | "turbidity"
): { historical: number; predicted: number } {
  const value =
    param === "ph"
      ? metrics.ph
      : param === "temp"
        ? metrics.temp
        : param === "do"
          ? metrics.dissolvedOxygen
          : metrics.turbidity;
  const noise = (Math.random() - 0.5) * 0.4;
  return { historical: value, predicted: +(value + noise).toFixed(2) };
}

export function buildInitialChart(
  metrics: MetricData,
  param: "ph" | "temp" | "do" | "turbidity"
): ChartPoint[] {
  const points: ChartPoint[] = [];
  const now = Date.now();
  let current = { ...metrics };
  for (let i = 9; i >= 0; i--) {
    const t = new Date(now - i * 4000);
    const timeStr = t.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const { historical, predicted } = metricsToChartPoint(current, param);
    points.push({ time: timeStr, historical, predicted });
    current = generateNextMetrics(current);
  }
  return points;
}
