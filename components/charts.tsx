import { useCampaignData } from "../hooks/useCampaignData";
import { aggregateHourly, aggregateDaily, aggregateWeekly ,aggregateMonthly } from "../lib/aggregate";
import type { Metrics } from "../types";

interface ChartsProps {
    period: string;
}

function Charts({ period }: ChartsProps) {
    const { data, loading, error } = useCampaignData();

    if (loading) return <div>Loading...</div>;
    if (error || !data) return <div>Error: {error}</div>;

    let aggregated: Metrics[] = [];

    if (period === "Hourly") aggregated = aggregateHourly(data.metrics, data.campaigns);
    else if (period === "Daily") aggregated = aggregateDaily(data.metrics, data.campaigns);
    else if (period === "Weekly") aggregated = aggregateWeekly(data.metrics, data.campaigns);
    else if (period === "Monthly") aggregated = aggregateMonthly(data.metrics, data.campaigns);

  return (
    <div></div>
  )
}

export default Charts;