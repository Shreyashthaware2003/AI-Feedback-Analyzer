import { api } from "@/lib/api";

export async function fetchFeedback() {
    try {
        const res = await api.get("/feedback");
        return res.data.data;
    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
}