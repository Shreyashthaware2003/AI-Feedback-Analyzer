import { api } from "@/lib/api";

export async function fetchMetrics() {
    const res = await api.get('/metrics');
    return {
        stats: res.data.stats,
        trends: res.data.trend
    }
}