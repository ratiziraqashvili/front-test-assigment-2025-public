import type { Campaign, Metrics } from "../types";

const getDateKey = (timestamp: string, period: 'hourly' | 'daily' | 'weekly' | 'monthly'): string => {
    const date = new Date(timestamp);

    switch (period) {
        case 'hourly':
            return date.toISOString().slice(0, 13) + ':00:00.000Z';
        case 'daily':
            return date.toISOString().slice(0, 10);
        case 'weekly':
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            return weekStart.toISOString().slice(0, 10);
        case 'monthly':
            return date.toISOString().slice(0, 7);
        default:
            throw new Error('Invalid period specified');    
        }
}

const aggregateMetrics = (
    metrics: Metrics[],
    campaigns: Campaign[],
    period: 'hourly' | 'daily' | 'weekly' | 'monthly'
): Metrics[] => {
    const grouped = metrics.reduce((acc, metric) => {        
        const dateKey = getDateKey(metric.timestamp, period);
        const key = `${metric.campaignId}-${dateKey}`;

        if (!acc[key]) {
            acc[key] = {
                campaignId: metric.campaignId,
                timestamp: dateKey,
                impressions: 0,
                clicks: 0,
                revenue: 0,
                count: 0
            };
        }

        acc[key].impressions += metric.impressions;
        acc[key].clicks += metric.clicks;
        acc[key].revenue += metric.revenue;
        acc[key].count += 1;

        return acc;
    }, {} as Record<string, Metrics & { count: number }>);

    return Object.values(grouped).map(({ count, ...metric }) => ({
        ...metric,
        revenue: Math.round(metric.revenue * 100) / 100
    }));
};

export const aggregateHourly = (metrics: Metrics[], campaigns: Campaign[]) => {
    return aggregateMetrics(metrics, campaigns, 'hourly');
}

export const aggregateDaily = (metrics: Metrics[], campaigns: Campaign[]) => {
    return aggregateMetrics(metrics, campaigns, 'daily');
}

export const aggregateWeekly = (metrics: Metrics[], campaigns: Campaign[]) => {
    return aggregateMetrics(metrics, campaigns, 'weekly');
}

export const aggregateMonthly = (metrics: Metrics[], campaigns: Campaign[]) => {
    return aggregateMetrics(metrics, campaigns, 'monthly');
}