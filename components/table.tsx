import React, { useMemo, useState } from "react";
import type { CampaignData, Metrics } from "../types";
import {
  aggregateDaily,
  aggregateHourly,
  aggregateMonthly,
  aggregateWeekly,
} from "../lib/aggregate";

interface TableProps {
  period: string;
  data: CampaignData | null;
}

export const Table = ({ period, data }: TableProps) => {
  const [sortBy, setSortBy] = useState<"date" | "clicks" | "revenue">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const sortedData = useMemo(() => {
    return [...aggregated].sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? a.timestamp.localeCompare(b.timestamp)
          : b.timestamp.localeCompare(a.timestamp);
      }
      if (sortBy === "clicks") {
        return sortOrder === "asc" ? a.clicks - b.clicks : b.clicks - a.clicks;
      }
      if (sortBy === "revenue") {
        return sortOrder === "asc"
          ? a.revenue - b.revenue
          : b.revenue - a.revenue;
      }
      return 0;
    });
  }, [aggregated, sortBy, sortOrder]);

  const campaignsPerTime = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    aggregated.forEach((m) => {
      if (!map[m.timestamp]) map[m.timestamp] = new Set();
      map[m.timestamp].add(m.campaignId);
    });
    return map;
  }, [aggregated]);

  return (
    <div className="overflow-x-auto max-h-[400px]">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => {
                setSortBy("date");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Date
            </th>
            <th className="px-4 py-2">Campaigns Active</th>
            <th className="px-4 py-2">Total Impressions</th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => {
                setSortBy("clicks");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Total Clicks
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => {
                setSortBy("revenue");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Total Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((m, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="px-4 py-2">{m.timestamp.slice(0, 10)}</td>
              <td className="px-4 py-2 text-center">
                {campaignsPerTime[m.timestamp]?.size || 0}
              </td>
              <td className="px-4 py-2">{m.impressions.toLocaleString()}</td>
              <td className="px-4 py-2">{m.clicks.toLocaleString()}</td>
              <td className="px-4 py-2">{m.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
