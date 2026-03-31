import { api } from "@/lib/api";

export async function fetchFeedback(page = 1, limit = 5) {
    try {
        const res = await api.get(`/feedback?page=${page}&limit=${limit}`);
        console.log("Fetched feedback data:", res.data);
        return {
            feedback: res.data.data,
            pagination: res.data.pagination,
        }
    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
}