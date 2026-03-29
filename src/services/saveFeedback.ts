import { api } from "@/lib/api";

export async function saveFeedback(data: {
    content: string;
    sentiment: string;
    summary: string;
}) {
    try {
        const res = await api.post('/feedback', data);
        return res.data;
    } catch (error) {
        console.error("Error saving feedback:", error);
    }
}