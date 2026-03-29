import { api } from "@/lib/api";

export async function fetchFeedback() {
    try {
        const res = await api.get("/feedback");
        console.log("Fetched feedback data:", res.data);
        return {
            feedback: res.data.data,
            stats: res.data.stats

        }
    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
}