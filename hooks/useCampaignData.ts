import { useEffect, useState } from "react";
import { CampaignData } from "../types";
import { loadData } from "../lib/loadData";

export const useCampaignData = () => {
    const [data, setData] = useState<CampaignData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await loadData();
                setData(data);
            } catch (error) {
                console.error("Error fetching campaign data:", error);
                setError("Failed to load campaign data.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
}