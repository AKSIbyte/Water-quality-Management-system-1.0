export type PredictionStatus = "Safe" | "Warning" | "Alert";

export interface WaterReading {
  timestamp: string;
  temp: number;
  ph: number;
  do: number;
  turbidity: number;
  prediction: PredictionStatus;
}

export interface MetricData {
  ph: number;
  temp: number;
  dissolvedOxygen: number;
  turbidity: number;
  prediction: PredictionStatus;
}

export interface MetricDelta {
  ph: number;
  temp: number;
  dissolvedOxygen: number;
  turbidity: number;
}

export interface ChartPoint {
  time: string;
  historical: number;
  predicted: number;
}

export interface AlertItem {
  id: string;
  type: "warning" | "alert";
  message: string;
  timestamp: string;
}

export type ChartParam = "ph" | "temp" | "do" | "turbidity";
