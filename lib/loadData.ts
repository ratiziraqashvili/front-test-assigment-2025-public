import type { CampaignData } from '../types';

export async function loadData(): Promise<CampaignData> {
    const response = await fetch('../data.json');

    if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
    }

    const campaignData = await response.json() as CampaignData;
    return campaignData;
}