import { useMemo } from "react";
import { useCampaignData } from "../hooks/useCampaignData";
import {
  aggregateHourly,
  aggregateDaily,
  aggregateWeekly,
  aggregateMonthly,
} from "../lib/aggregate";
import type { CampaignData, Metrics } from "../types";

interface ChartsProps {
  period: string;
  error: string | null;
  loading: boolean;
  data: CampaignData | null;
}

export function Charts({ period, error, loading, data }: ChartsProps) {
  const aggregated = useMemo<Metrics[]>(() => {
    if (!data) return [];

    switch (period) {
      case "Hourly":
        return aggregateHourly(data.metrics, data.campaigns);
      case "Daily":
        return aggregateDaily(data.metrics, data.campaigns);
      case "Weekly":
        return aggregateWeekly(data.metrics, data.campaigns);
      case "Monthly":
        return aggregateMonthly(data.metrics, data.campaigns);
      default:
        return [];
    }
  }, [data, period]);

  const chartData = aggregated
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .map((metric) => ({
      x: metric.timestamp,
      y: metric.revenue,
    }));

  const width = Math.max(600, chartData.length * 12);
  const height = 300;
  const padding = 40;

  const yMax = Math.max(...chartData.map((d) => d.y));
  const yStep = Math.ceil(yMax / 10);

  const barWidth = (width - 2 * padding) / chartData.length;

  const bars = chartData.map((d, i) => {
    const barHeight = (d.y / yMax) * (height - 2 * padding);
    return {
      x: padding + i * barWidth,
      y: height - padding - barHeight,
      height: barHeight,
      width: barWidth * 0.8, // add some spacing between bars
    };
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height}>
        {bars.map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            fill="#0ea5e9"
          />
        ))}

        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="black"
        />

        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="black"
        />

        {chartData.map((d, i) => {
          if (i % Math.ceil(chartData.length / 10) !== 0) return null; // show ~10 labels max
          return (
            <text
              key={i}
              x={padding + i * barWidth + barWidth / 2}
              y={height - padding + 15}
              fontSize="10"
              textAnchor="middle"
            >
              {period === "Hourly" ? d.x.slice(11, 16) : d.x}
            </text>
          );
        })}

        {[
          0,
          yStep,
          2 * yStep,
          3 * yStep,
          4 * yStep,
          5 * yStep,
          6 * yStep,
          7 * yStep,
          8 * yStep,
          9 * yStep,
          10 * yStep,
        ].map((val, i) => (
          <text
            key={i}
            x={padding - 10}
            y={height - padding - (val / yMax) * (height - 2 * padding) + 5}
            fontSize="10"
            textAnchor="end"
          >
            {val}
          </text>
        ))}
      </svg>
    </div>
  );
}
