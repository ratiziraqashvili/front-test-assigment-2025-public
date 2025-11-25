export type Campaign = {
    id: string;
    name: string;
    platform: string;
}

export type Metrics = {
    campaignId: string;
    timeStamp: string;
    impressions: number;
    clicks: number;
    revenue: number;
}

export type Metadata = {
    generatedAt: string;
    description: string;
}

export type CampaignData = {
    metadata: Metadata;
    campaigns: Campaign[];
    metrics: Metrics[];
}